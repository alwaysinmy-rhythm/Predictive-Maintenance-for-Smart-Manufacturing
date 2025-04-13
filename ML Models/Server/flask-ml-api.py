from flask import Flask, jsonify
import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor
import joblib
import time
import logging
from apscheduler.schedulers.background import BackgroundScheduler
import os
from dotenv import load_dotenv
from helper_functions import load_saved_models, create_sequences, prepare_test_data, make_predictions

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO,
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define scheduler at module level so it can be accessed in the shutdown code
scheduler = BackgroundScheduler()

# Load the ML models
try:
    models = load_saved_models()
    logger.info("ML models loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {e}")

# Path to the CSV file containing features
CSV_FILE_PATH = './static/cnc_machine_static_data.csv'

# PostgreSQL connection string
DATABASE_URL = os.getenv("DATABASE_URL")

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

# Function to process a single machine unit
def process_machine_unit(machine_id, row_idx):
    try:
        # Read the CSV file
        df = pd.read_csv(CSV_FILE_PATH)
        # df = df[feature_columns]

        # Check if the row_idx is valid
        if row_idx >= len(df):
            logger.warning(f"Row index {row_idx} out of bounds for machine {machine_id}")
            return False
        
        # Extract features for the specific row
        test_df = df.iloc[row_idx]
        results = make_predictions(test_df, models)
    
        # Store predictions in the database
        conn = get_db_connection()
        cursor = conn.cursor()
        timestamp_value = test_df.get('timestamp', pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S'))
        # Select important features to store alongside predictions
        important_features = {
            'id': machine_id,
            'timestamp': timestamp_value,
            'anomaly_score': results['anomaly_score'],
            'predicted_anomaly': results['predicted_anomaly'],
            'predicted_anomaly_type': results['predicted_anomaly_type'], 
            'predicted_health_score': results['predicted_health_score'],
            'predicted_days_to_maintenance': results['predicted_days_to_maintenance'],
            'motor_temp_C': test_df.get('motor_temp_C', 60),
            'power_consumption_W': test_df.get('power_consumption_W', 5000),
            'cutting_force_N': test_df.get('cutting_force_N', 200),
        }
        
        # Prepare SQL INSERT dynamically
        columns = ', '.join(important_features.keys())
        placeholders = ', '.join(['%s'] * len(important_features))
        values = list(important_features.values())

        # Build query
        query = f'''
            INSERT INTO machine ({columns})
            VALUES ({placeholders})
        '''

        # Execute
        cursor.execute(query, values)
                
        # Update the row index in the 'Pointers' table
        cursor.execute('''
            UPDATE factory 
            SET row_idx = %s 
            WHERE id = %s
        ''', ((row_idx + 1) % 10000, machine_id))
        
        conn.commit()
        conn.close()
        
        # Fixed is_anomaly reference by using the predicted_anomaly from results
        logger.info(f"Processed machine_id: {machine_id}, row_idx: {row_idx}, is_anomaly: {results['predicted_anomaly']}")
        return True
    
    except Exception as e:
        logger.error(f"Error processing machine {machine_id}: {e}")
        return False

# Function to process all machine units
def process_all_machines():
    logger.info("Starting processing cycle for all machines")
    conn = get_db_connection()
    # Use RealDictCursor to get dictionary-like results
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get all machine IDs and their current row indices
    cursor.execute('SELECT id, row_idx FROM factory')
    pointers = cursor.fetchall()
    conn.close()
    
    processed_count = 0
    for pointer in pointers:
        machine_id = pointer['id']
        row_idx = pointer['row_idx']
        success = process_machine_unit(machine_id, row_idx)
        if success:
            processed_count += 1
    
    logger.info(f"Completed processing cycle. Processed {processed_count}/{len(pointers)} machines.")
    return processed_count

# Schedule the processing function to run periodically
def initialize():
    global scheduler
    # Run the processing function every 5 minutes (adjust as needed)
    scheduler.add_job(func=process_all_machines, trigger="interval", minutes=0.1)
    scheduler.start()
    logger.info("Scheduler started")

# In Flask 2.x, @app.before_first_request is deprecated
# Using this approach instead
with app.app_context():
    initialize()

# API endpoints
@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        'status': 'running',
        'message': 'ML prediction service is active'
    })

@app.route('/trigger', methods=['GET'])
def trigger_processing():
    machines_processed = process_all_machines()
    return jsonify({
        'status': 'success',
        'machines_processed': machines_processed
    })

@app.route('/machine/<machine_id>', methods=['GET'])
def get_machine_predictions(machine_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get the latest prediction for the specified machine
    cursor.execute('''
        SELECT * FROM predictions 
        WHERE machine_id = %s 
        ORDER BY timestamp DESC 
        LIMIT 1
    ''', (machine_id,))
    
    prediction = cursor.fetchone()
    conn.close()
    
    if prediction:
        return jsonify(dict(prediction))
    else:
        return jsonify({'error': 'No predictions found for this machine'}), 404

if __name__ == '__main__':
    # Make sure the scheduler is properly shut down when the app stops
    try:
        app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
    except (KeyboardInterrupt, SystemExit):
        # Shut down the scheduler gracefully
        scheduler.shutdown()