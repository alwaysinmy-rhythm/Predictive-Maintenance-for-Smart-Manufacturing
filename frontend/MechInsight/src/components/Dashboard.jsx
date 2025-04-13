import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './CSS/Dashboard.css';

// Generate the last 12 hours of timestamps (one entry per hour)
const generateTimeData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - i);
    
    data.push({
      timestamp: timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      temperature: Math.floor(Math.random() * 15) + 65, // 65-80
      powerConsumption: Math.floor(Math.random() * 40) + 140, // 140-180
      cuttingForce: Math.floor(Math.random() * 30) + 85, // 85-115
      healthScore: Math.floor(Math.random() * 30) + 70, // 70-100
      anomalyScore: Math.floor(Math.random() * 5) // 0-5
    });
  }
  
  return data;
};

// Generate machine dummy data
const generateMachineData = () => [
  { machine_no: 'M001', maintenance: true, anomaly: 3, health: 45 },
  { machine_no: 'M002', maintenance: false, anomaly: 0, health: 92 },
  { machine_no: 'M003', maintenance: false, anomaly: 1, health: 78 },
  { machine_no: 'M004', maintenance: true, anomaly: 5, health: 32 },
  { machine_no: 'M005', maintenance: false, anomaly: 0, health: 88 },
  { machine_no: 'M006', maintenance: false, anomaly: 0, health: 95 },
  { machine_no: 'M007', maintenance: true, anomaly: 2, health: 63 },
];

// Generate initial anomalies data
const generateAnomaliesData = () => [
  { machine_no: 'M001', anomaly: 3, timestamp: '4/13/2025, 10:15:22 AM' },
  { machine_no: 'M003', anomaly: 1, timestamp: '4/13/2025, 9:45:07 AM' },
  { machine_no: 'M004', anomaly: 5, timestamp: '4/13/2025, 8:30:45 AM' },
  { machine_no: 'M007', anomaly: 2, timestamp: '4/12/2025, 11:22:18 PM' }
];

const Dashboard = () => {
  const [machineData, setMachineData] = useState(() => generateTimeData());
  const [machines, setMachines] = useState(() => generateMachineData());
  const [anomalies, setAnomalies] = useState(() => generateAnomaliesData());
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [selectedMachine, setSelectedMachine] = useState("M001");

  // Function to simulate data updates
  const updateData = () => {
    // Update time series data
    const newDataPoint = {
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      temperature: Math.floor(Math.random() * 15) + 65,
      powerConsumption: Math.floor(Math.random() * 40) + 140,
      cuttingForce: Math.floor(Math.random() * 30) + 85,
      healthScore: Math.floor(Math.random() * 30) + 70,
      anomalyScore: Math.floor(Math.random() * 5)
    };
    
    setMachineData(prevData => {
      const newData = [...prevData.slice(1), newDataPoint];
      return newData;
    });
    
    // Randomly update some machine values
    const updatedMachines = machines.map(machine => {
      // 30% chance to change a machine's data
      if (Math.random() > 0.7) {
        // Generate new random values
        const newHealth = Math.max(20, Math.min(100, machine.health + Math.floor(Math.random() * 20) - 10));
        const newAnomaly = Math.random() > 0.7 ? Math.floor(Math.random() * 6) : machine.anomaly;
        const newMaintenance = newHealth < 50 ? true : machine.maintenance;
        
        return {
          ...machine,
          health: newHealth,
          anomaly: newAnomaly,
          maintenance: newMaintenance
        };
      }
      return machine;
    });
    
    setMachines(updatedMachines);
    
    // Check for new anomalies
    const newAnomalies = updatedMachines
      .filter(machine => machine.anomaly > 0)
      .map(machine => ({
        machine_no: machine.machine_no,
        anomaly: machine.anomaly,
        timestamp: new Date().toLocaleString()
      }))
      .filter(anomaly => 
        !anomalies.some(
          existing => 
            existing.machine_no === anomaly.machine_no && 
            existing.anomaly === anomaly.anomaly &&
            existing.timestamp === anomaly.timestamp
        )
      );
    
    // Add new anomalies to the array
    if (newAnomalies.length > 0) {
      setAnomalies(prevAnomalies => [...newAnomalies, ...prevAnomalies]);
    }
    
    setLastUpdated(new Date().toLocaleString());
  };

  useEffect(() => {
    // Set up interval to simulate data updates every minute
    const intervalId = setInterval(updateData, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [machines, anomalies]);

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
                      {machine.anomaly}
                    </td>
                    <td>{machine.health}%</td>
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
                    Anomaly Level: <span className="anomaly-value">{anomaly.anomaly}</span>
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
        <section className="graph-section">
          <h2>Machine Parameters</h2>
          <div className="graph-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={machineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value, name) => {
                    const formattedName = {
                      temperature: 'Temperature',
                      powerConsumption: 'Power Consumption',
                      cuttingForce: 'Cutting Force'
                    }[name] || name;
                    return [`${value} ${name === 'temperature' ? '°C' : name === 'powerConsumption' ? 'W' : 'N'}`, formattedName];
                  }}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Legend 
                  formatter={(value) => {
                    return {
                      temperature: 'Temperature (°C)',
                      powerConsumption: 'Power Consumption (W)',
                      cuttingForce: 'Cutting Force (N)'
                    }[value] || value;
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#e74c3c"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="powerConsumption"
                  stroke="#3498db"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cuttingForce"
                  stroke="#2ecc71"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="graph-section">
          <h2>Health Score</h2>
          <div className="graph-wrapper">
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
          </div>
        </section>

        <section className="graph-section">
          <h2>Anomaly Score</h2>
          <div className="graph-wrapper">
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
          </div>
        </section>
      </div>
      
      <div className="actions">
        <button 
          className="update-button"
          onClick={updateData}
        >
          Simulate Data Update
        </button>
      </div>
    </div>
  );
};

export default Dashboard;