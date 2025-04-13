import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './CSS/Dashboard.css';
import axios from 'axios';

const BACKEND_URL='https://predictive-maintenance-for-smart.onrender.com';

const Dashboard = () => {
  const [machineData, setMachineData] = useState([]);
  const [machines, setMachines] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [selectedMachine, setSelectedMachine] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all machines data from the backend
  const fetchMachinesData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/machine_details`,
        {},
        {
          headers: {
            token: token
          }
        }
      );

      // console.log('All Machines API Response:', response.data);

      if (response.data && response.data.machines) {
        // Process machines data
        const machinesData = response.data.machines.map(machine => ({
          machine_no: machine.id,
          maintenance: machine.predicted_days_to_maintenance <= 7,
          anomaly: machine.predicted_anomaly ? machine.anomaly_score : 0,
          health: machine.predicted_health_score,
        }));
        
        setMachines(machinesData);
        
        // Set default selected machine if not already set
        if (!selectedMachine && machinesData.length > 0) {
          setSelectedMachine(machinesData[0].machine_no);
        }
        
        // Process anomalies
        const anomaliesData = response.data.machines
          .filter(machine => machine.predicted_anomaly)
          .map(machine => ({
            machine_no: machine.id,
            anomaly: machine.anomaly_score,
            anomaly_type: machine.predicted_anomaly_type,
            timestamp: new Date(machine.timestamp).toLocaleString()
          }));
        
        setAnomalies(anomaliesData);
        setLastUpdated(new Date().toLocaleString());
        setError(null);
      } else {
        setError('Invalid data received from server');
      }
    } catch (err) {
      // console.error('Error fetching machines data:', err);
      setError(`Failed to fetch machines data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch data for a specific machine
  const fetchMachineDetails = async (machineId) => {
    if (!machineId) return;
    
    try {
      setDetailLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // console.error('Token not found for machine details');
        return;
      }

      const response = await axios.get(
        `${BACKEND_URL}/machine_details/${machineId}`,
        {
          headers: {
            token: token
          }
        }
      );

      // console.log(`Machine ${machineId} Detail Response:`, response.data);

      if (response.data && response.data.timeSeriesData) {
        // Format the time series data for the charts - match field names from backend
        const formattedData = response.data.timeSeriesData.map(item => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          temperature: item.motor_temp_c, 
          powerConsumption: item.power_consumption_w, 
          cuttingForce: item.cutting_force_n, 
          healthScore: item.predicted_health_score,
          anomalyScore: item.anomaly_score
        }));
        
        // Reverse to show oldest to newest (left to right in charts)
        setMachineData(formattedData.reverse());
      } else {
        console.warn('No time series data found for machine:', machineId);
        setMachineData([]);
      }
    } catch (err) {
      console.error(`Error fetching details for machine ${machineId}:`, err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Fetch all machines data when component mounts
  useEffect(() => {
    fetchMachinesData();
    
    // Set up interval to refresh all machines data every minute
    const intervalId = setInterval(fetchMachinesData, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch detailed data when selectedMachine changes
  useEffect(() => {
    if (selectedMachine) {
      fetchMachineDetails(selectedMachine);
    }
  }, [selectedMachine]);

  // Function to determine row class based on health status
  const getRowClass = (health) => {
    if (health >= 80) return 'healthy';
    if (health >= 50) return 'warning';
    return 'critical';
  };

  const getHealthColor = (value) => {
    if (value >= 80) return "#2ecc71";
    if (value >= 50) return "#f1c40f";
    return "#e74c3c";
  };

  // Check if we're still loading initial data
  if (loading && machines.length === 0) {
    return <div className="loading">Loading machine data...</div>;
  }

  // If there's an error and no data, show error message
  if (error && machines.length === 0) {
    return <div className="error-message">{error}</div>;
  }

  // If we have no data yet (but no error), show empty state
  if (machines.length === 0) {
    return <div className="empty-state">No machine data available. Please check your connection.</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Machine Monitoring Dashboard</h1>
        <div className="machine-selector">
          <label htmlFor="machine-select">Machine: </label>
          <select 
            id="machine-select" 
            value={selectedMachine} 
            onChange={(e) => setSelectedMachine(e.target.value)}
          >
            {machines.map(machine => (
              <option key={machine.machine_no} value={machine.machine_no}>
                {machine.machine_no}
              </option>
            ))}
          </select>
        </div>
        <div className="last-updated">
          Last updated: {lastUpdated}
          {loading && <span className="loading-indicator"> (Refreshing...)</span>}
        </div>
      </header>

      <div className="dashboard-content">
        <section className="machines-section">
          <h2>Machine Status</h2>
          <div className="table-container">
            <table className="machines-table">
              <thead>
                <tr>
                  <th>Machine No.</th>
                  <th>Maintenance</th>
                  <th>Anomaly</th>
                  <th>Health (%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr 
                    key={machine.machine_no} 
                    className={`${getRowClass(machine.health)} ${machine.machine_no === selectedMachine ? 'selected-row' : ''}`}
                    onClick={() => setSelectedMachine(machine.machine_no)}
                  >
                    <td>{machine.machine_no}</td>
                    <td>{machine.maintenance ? 'Required' : 'Not Required'}</td>
                    <td className={machine.anomaly > 0 ? 'anomaly-alert' : ''}>
                      {typeof machine.anomaly === 'number' ? machine.anomaly.toFixed(2) : '0.00'}
                    </td>
                    <td>{typeof machine.health === 'number' ? machine.health.toFixed(1) : '0.0'}%</td>
                    <td>
                      <span className={`status-indicator ${getRowClass(machine.health)}`}></span>
                      {machine.health >= 80 ? 'Good' : machine.health >= 50 ? 'Warning' : 'Critical'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="anomalies-section">
          <h2>Recent Anomalies</h2>
          {anomalies.length > 0 ? (
            <div className="anomalies-list">
              {anomalies.map((anomaly, index) => (
                <div key={index} className="anomaly-card">
                  <div className="anomaly-header">
                    <span className="machine-label">Machine {anomaly.machine_no}</span>
                    <span className="anomaly-time">{anomaly.timestamp}</span>
                  </div>
                  <div className="anomaly-details">
                    <div>Anomaly Level: <span className="anomaly-value">
                      {typeof anomaly.anomaly === 'number' ? anomaly.anomaly.toFixed(2) : '0.00'}
                    </span></div>
                    {anomaly.anomaly_type && (
                      <div>Type: <span className="anomaly-type">{anomaly.anomaly_type}</span></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-anomalies">No anomalies detected.</p>
          )}
        </section>
      </div>
      
      <div className="graphs-container">
        {/* Temperature Graph */}
        <section className="graph-section">
          <h2>Temperature (°C) {detailLoading && <span className="loading-indicator">(Loading...)</span>}</h2>
          <div className="graph-wrapper">
            {machineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={machineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`${value} °C`, 'Temperature']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#e74c3c" 
                    strokeWidth={2}
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data-message">No temperature data available</div>
            )}
          </div>
        </section>

        {/* Power Consumption Graph */}
        <section className="graph-section">
          <h2>Power Consumption (W)</h2>
          <div className="graph-wrapper">
            {machineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={machineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`${value} W`, 'Power Consumption']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="powerConsumption" 
                    stroke="#3498db" 
                    strokeWidth={2}
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data-message">No power consumption data available</div>
            )}
          </div>
        </section>

        {/* Cutting Force Graph */}
        <section className="graph-section">
          <h2>Cutting Force (N)</h2>
          <div className="graph-wrapper">
            {machineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={machineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`${value} N`, 'Cutting Force']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cuttingForce" 
                    stroke="#2ecc71" 
                    strokeWidth={2}
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data-message">No cutting force data available</div>
            )}
          </div>
        </section>

        <section className="graph-section">
          <h2>Health Score</h2>
          <div className="graph-wrapper">
            {machineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={machineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`${value}%`, 'Health Score']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="healthScore" 
                    stroke="#2ecc71" 
                    fill="#2ecc71" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data-message">No health score data available</div>
            )}
          </div>
        </section>

        <section className="graph-section">
          <h2>Anomaly Score</h2>
          <div className="graph-wrapper">
            {machineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={machineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 'dataMax + 1']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [value, 'Anomaly Score']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Bar 
                    dataKey="anomalyScore" 
                    fill="#e74c3c" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data-message">No anomaly data available</div>
            )}
          </div>
        </section>
      </div>
      
      <div className="actions">
        <button 
          className="update-button"
          onClick={() => {
            fetchMachinesData();
            if (selectedMachine) {
              fetchMachineDetails(selectedMachine);
            }
          }}
          disabled={loading || detailLoading}
        >
          {loading || detailLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;