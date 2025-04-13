import pool from '../config/db.js';
import Status from '../config/status.js';

export  async function machinedetailsController(req, res) {
  const username = req.username;
  console.log("rhythm : " , username);
  try {
    // Validate input
    if (!username) {
      return res.status(Status.BAD_REQUEST).json({ message: 'Username is required' });
    }

    // Step 1: Get all factory IDs associated with this username
    const factoryQuery = 'SELECT id FROM factory WHERE username = $1';
    const factoryResult = await pool.query(factoryQuery, [username]);
    if (factoryResult.rows.length === 0) {
      return res.status(Status.NOT_FOUND).json({ message: 'No machines found for this username' });
    }
    
    // Extract all machine IDs
    const machineIds = factoryResult.rows.map(row => row.id);
    
    // Step 2: Get machine data for these IDs with newest timestamps, limited to 50
    const machineQuery = `
      SELECT * FROM (
        SELECT DISTINCT ON (id) *
        FROM machine
        WHERE id = ANY($1)
        ORDER BY id, timestamp DESC
      ) latest_records
      ORDER BY timestamp DESC
      LIMIT 50
    `;
    
    const machineResult = await pool.query(machineQuery, [machineIds]);
    
    // Format and return data
    const machineData = {
      username,
      machines: machineResult.rows,
      totalCount: machineIds.length,
      returnedCount: machineResult.rows.length
    };
    console.log(`Returning ${machineData.returnedCount} machine records for username: ${username}`);
    return res.status(200).json(machineData);
    
  } catch (error) {
    console.error('Error fetching machine data:', error);
    return res.status(Status.INTERNAL_ERROR).json({ message: 'Internal Server Error' });
  }
}


export async function getMachineDetailById(req, res) {
    
    let machineId = req.params.machineId;
    machineId = parseInt(machineId, 10); // Convert to integer with base 10
    
    let limit = 40; 
    const username = req.username; 
    try {
      // Validate input
      if (!machineId) {
        return res.status(Status.BAD_REQUEST).json({ message: 'Machine ID is required' });
      }
      
      // Check if user has access to this machine
      const accessQuery = 'SELECT id FROM factory WHERE id = $1 AND username = $2';
      const accessResult = await pool.query(accessQuery, [machineId, username]);
      
      if (accessResult.rows.length === 0) {
        return res.status(Status.FORBIDDEN).json({ message: 'Access denied or machine not found' });
      }
      
      // Get the machine data
      const dataQuery = `
        SELECT * 
        FROM machine 
        WHERE id = $1 
        ORDER BY timestamp DESC 
        LIMIT $2
      `;
      
      const dataResult = await pool.query(dataQuery, [machineId, limit]);
      
      if (dataResult.rows.length === 0) {
        return res.status(Status.NOT_FOUND).json({ message: 'No data found for this machine' });
      }
      
      // Return detailed data
      const machineDetail = {
        machineId,
        username,
        timeSeriesData: dataResult.rows,
        dataPoints: dataResult.rows.length
      };
      
      return res.status(Status.SUCCESS).json(machineDetail);
      
    } catch (error) {
      console.error('Error fetching machine detail:', error);
      return res.status(Status.INTERNAL_ERROR).json({ message: 'Internal Server Error' });
    }
  }