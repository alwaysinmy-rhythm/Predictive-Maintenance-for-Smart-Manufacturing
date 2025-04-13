import pandas as pd
import numpy as np
import joblib
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler

# Load models and scalers
def load_saved_models():
    print("Loading saved models...")
    
    # Load anomaly detection model
    iso_forest = joblib.load('./static/isolation_forest_model.pkl')
    
    # Load anomaly type classifier
    anomaly_type_classifier = joblib.load('./static/anomaly_type_classifier.pkl')
    
    # Load health score predictor
    health_score_predictor = joblib.load('./static/health_score_predictor.pkl')
    
    # Load LSTM maintenance predictor
    maintenance_predictor = load_model('./static/maintenance_predictor_lstm.h5')
    
    # Load scalers
    scaler_anomaly = joblib.load('./static/scaler_anomaly.pkl')
    scaler_X_maint = joblib.load('./static/scaler_X_maint.pkl')
    scaler_y_maint = joblib.load('./static/scaler_y_maint.pkl')
    
    print("Models loaded successfully.")
    
    return {
        'iso_forest': iso_forest,
        'anomaly_type_classifier': anomaly_type_classifier,
        'health_score_predictor': health_score_predictor,
        'maintenance_predictor': maintenance_predictor,
        'scaler_anomaly': scaler_anomaly,
        'scaler_X_maint': scaler_X_maint,
        'scaler_y_maint': scaler_y_maint
    }

# Function to prepare test data (same feature preparation as in training)
def prepare_test_data(df):
    # Make sure timestamp is in datetime format
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        # Create time-based features
        df['hour'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.dayofweek
        df['day_of_month'] = df['timestamp'].dt.day
        df['month'] = df['timestamp'].dt.month
    
    # Define the same feature columns used in training
    feature_columns = [
        'vibration_rms', 'motor_temp_C', 'spindle_current_A', 'rpm', 
        'tool_usage_min', 'coolant_temp_C', 'cutting_force_N', 
        'power_consumption_W', 'acoustic_level_dB', 'machine_hours_today',
        'total_machine_hours', 'vibration_trend', 'motor_temp_trend',
        'power_efficiency', 'tool_wear_rate', 'vibration_std_24h',
        'temp_rate_change', 'current_stability', 'hour', 'day_of_week'
    ]
    
    # Check if all features are available in the test data
    missing_features = [feat for feat in feature_columns if feat not in df.columns]
    if missing_features:
        print(f"Warning: Missing features in test data: {missing_features}")
        print("These features will be initialized with zeros.")
        for feat in missing_features:
            df[feat] = 0
    
    return df, feature_columns

# Function to create sequences for LSTM (same as in training)
def create_sequences(X, time_steps=48):
    Xs = []
    for i in range(len(X) - time_steps + 1):
        Xs.append(X[i:(i + time_steps)])
    return np.array(Xs)

# Main prediction function
def make_predictions(test_df, models):
    # Prepare test data
    df, feature_columns = prepare_test_data(test_df)
    
    # Make a copy of the DataFrame to add predictions
    results_df = df.copy()
    
    # 1. Anomaly Detection
    print("Running anomaly detection...")
    X_anomaly = df[feature_columns].copy()
    
    # Scale data using the same scaler used in training
    X_anomaly_scaled = models['scaler_anomaly'].transform(X_anomaly)
    X_anomaly_scaled = pd.DataFrame(X_anomaly_scaled)
    X_anomaly_scaled = X_anomaly_scaled.fillna(X_anomaly_scaled.mean())
    X_anomaly_scaled = X_anomaly_scaled.values
    
    # Predict anomalies
    anomaly_scores = models['iso_forest'].decision_function(X_anomaly_scaled)
    predicted_anomalies = (models['iso_forest'].predict(X_anomaly_scaled) == -1).astype(int)
    
    # Add predictions to results
    results_df['anomaly_score'] = anomaly_scores
    results_df['predicted_anomaly'] = predicted_anomalies
    
    # 2. Anomaly Type Classification (only for predicted anomalies)
    print("Classifying anomaly types...")
    anomaly_rows = results_df[results_df['predicted_anomaly'] == 1]
    
    if not anomaly_rows.empty:
        X_type = anomaly_rows[feature_columns]
        predicted_types = models['anomaly_type_classifier'].predict(X_type)
        
        # Create a Series with predicted types
        anomaly_types = pd.Series(index=anomaly_rows.index, data=predicted_types)
        
        # Add to results dataframe
        results_df['predicted_anomaly_type'] = None
        results_df.loc[anomaly_rows.index, 'predicted_anomaly_type'] = anomaly_types
    else:
        results_df['predicted_anomaly_type'] = 'normal'
        print("No anomalies detected for classification.")
    
    # 3. Health Score Prediction
    print("Predicting machine health scores...")
    X_health = df[feature_columns]
    predicted_health_scores = models['health_score_predictor'].predict(X_health)
    results_df['predicted_health_score'] = predicted_health_scores
    
    # 4. Maintenance Prediction (LSTM)
    print("Predicting days to maintenance...")
    X_maint = df[feature_columns].copy()
    
    # Scale the data
    X_maint_scaled = models['scaler_X_maint'].transform(X_maint)
    
    # Create sequences for LSTM
    time_steps = 48  # Same as in training
    
    # Check if we have enough data for sequences
    if len(X_maint_scaled) >= time_steps:
        X_seq = create_sequences(X_maint_scaled, time_steps)
        
        # Predict using LSTM
        y_pred_maint_scaled = models['maintenance_predictor'].predict(X_seq)
        
        # Inverse transform to get actual values
        y_pred_maint = models['scaler_y_maint'].inverse_transform(y_pred_maint_scaled)
        
        # Add predictions to results (aligned properly with sequence offset)
        results_df['predicted_days_to_maintenance'] = 30
        for i in range(len(y_pred_maint)):
            idx = i + time_steps - 1
            if idx < len(results_df):
                results_df.iloc[idx, results_df.columns.get_loc('predicted_days_to_maintenance')] = y_pred_maint[i][0]
    else:
        print(f"Warning: Not enough data for maintenance prediction. Need at least {time_steps} rows.")
        results_df['predicted_days_to_maintenance'] = 30
        
    return results_df