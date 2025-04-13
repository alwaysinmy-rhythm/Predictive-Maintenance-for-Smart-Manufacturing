
# CNC Milling Machine Anomaly Detection, Maintenance Prediction, and Health Monitoring

This project aims to develop an AI-driven system for CNC milling machine anomaly detection, classification, maintenance prediction, and health detection. By leveraging machine learning models, the system provides real-time monitoring through a dashboard where users can check whether a particular CNC machine is facing anomalies, the type of anomaly, future maintenance plans, and its overall health status.

## Project Overview

The system uses multiple machine learning models, each tailored for specific tasks:

- **Anomaly Detection**: Uses **Isolation Forest** to identify whether a machine is operating outside its normal parameters based on historical data.
- **Anomaly Type Classification**: **Random Forest** is used to classify different types of detected anomalies.
- **Maintenance Prediction**: **LSTM (Long Short-Term Memory Neural Network)** is employed to predict future maintenance needs, especially considering the time-series nature of the data.
- **Machine Health Score**: **Random Forest Regressor** is used to estimate the overall health of a CNC machine based on various operational parameters.

Additionally, the project includes a web dashboard to visualize predictions and maintenance alerts.

## Key Features

- **Anomaly Detection**: Identifies anomalies in real-time using over 1,500 data samples.
- **Anomaly Classification**: Categorizes the detected anomalies using Random Forest.
- **Maintenance Forecast**: Predicts when maintenance is required using LSTM to analyze time-series data.
- **Health Monitoring**: Provides a health score of the machine, which helps in predicting the machine's performance and lifespan.
- **Web Dashboard**: Built with React.js to display live predictions and updates.
- **Real-time Data Simulation**: The backend simulates real-time data every minute, mimicking input from CNC machines.
- **Data Storage**: Predictions and sensor data are stored in a PostgreSQL database for future analysis.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **AI Models**:
  - Anomaly Detection: Isolation Forest
  - Anomaly Type Classification: Random Forest
  - Maintenance Prediction: LSTM (Custom Layers)
  - Machine Health Score: Random Forest Regressor
- **Database**: PostgreSQL
- **Deployment**: Flask API deployed on Railway
- **Data Simulation**: Scheduler in Python for simulating data updates every minute

## Model Training

The models were trained on a dataset consisting of the following feature columns:

```python
feature_columns = [
    'vibration_rms', 'motor_temp_C', 'spindle_current_A', 'rpm',
    'tool_usage_min', 'coolant_temp_C', 'cutting_force_N',
    'power_consumption_W', 'acoustic_level_dB', 'machine_hours_today',
    'total_machine_hours', 'vibration_trend', 'motor_temp_trend',
    'power_efficiency', 'tool_wear_rate', 'vibration_std_24h',
    'temp_rate_change', 'current_stability', 'hour', 'day_of_week'
]
```

- **Anomaly Detection**: The **Isolation Forest** model was trained with over 1,500 data samples.
- **Anomaly Classification**: **Random Forest** was used to categorize detected anomalies.
- **Maintenance Prediction**: **LSTM** was used for predicting maintenance schedules based on time-series data.
- **Machine Health Score**: **Random Forest Regressor** was employed to assess the health of the machine.

## Workflow

1. **Data Simulation**: Every minute, the backend simulates incoming data using a scheduler in Python, mimicking real-world sensor data.
2. **Model Predictions**: The Flask backend loads the trained models and makes predictions for the incoming data. These predictions are stored in a PostgreSQL database.
3. **Frontend Display**: The React.js dashboard fetches the data from the database and displays:
   - Anomaly detection status
   - Anomaly classification (type)
   - Future maintenance predictions
   - Current machine health score
  
## 📊 Feature Distributions

Understanding the underlying distributions of various features in the dataset.

![Distributions](./Distributions.jpg)

## 🔍 Feature Importance

### Anomaly Type Classification
Feature importance for identifying types of anomalies in equipment behavior.

![Feature Importance for Anomaly Type Classification](./feature%20importance%20for%20anomly%20type%20classification.jpg)

### Health Score Prediction (Version 1)
Key features contributing to the prediction of equipment health scores.

![Feature Importance for Health Score Prediction](./feature%20importance%20for%20health%20score%20prediction.jpg)

---

## 📉 LSTM Model Performance

Training and validation loss over epochs for the LSTM model used in time-series forecasting.

![LSTM Training and Validation Loss](./LSTM%20training%20and%20validiation%20loss%20plot.jpg)

---

## 🛠️ Maintenance Prediction

Predicted maintenance windows or failure probabilities over time.

![Maintenance Prediction](./Maintenance%20prediction%20plot.jpg)

---

## 📈 Model Evaluation

Performance scores and confusion matrices for multiple machine learning models.

![Model Scores and Confusion Matrices](./score%20and%20confusion%20matrics%20for%20models.jpg)

---


## How to Run the Project

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL
- Flask
- React.js

### Backend Setup (Flask API)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up the PostgreSQL database:
   - Create a database in PostgreSQL and update the connection details in the `config.py` file.

4. Run the Flask API:
   ```bash
   python flask-ml-api.py
   ```

5. The Flask API will start running on `http://localhost:5000`.

### Frontend Setup (React.js)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the React development server:
   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser to access the dashboard.

### Deploying on Railway

The Flask API can be deployed on **Railway** for production use. Follow Railway’s documentation to set up your deployment and connect the API to the frontend.

## Contributing

We welcome contributions to improve this project! Feel free to fork the repository, open issues, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
