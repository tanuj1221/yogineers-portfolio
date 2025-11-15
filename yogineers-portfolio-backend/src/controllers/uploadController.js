// uploadController.js

const xlsx = require('xlsx');
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../config/db'); // Your mysql2 pool connection

const uploadData = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }

  const filePath = req.file.path;
  const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

  console.log('Uploaded File Details:', {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    extname: '.' + fileExtension
  });

  try {
    let data = [];

    if (fileExtension === 'xlsx') {
      // Parse Excel file
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet);
    } else if (fileExtension === 'csv') {
      // Parse CSV file
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => data.push(row))
          .on('end', resolve)
          .on('error', reject);
      });
    } else {
      return res.status(400).json({ error: 'Unsupported file format!' });
    }

    // Insert data into the database
    if (data.length > 0) {
      const tableName = req.body.tableName; // Table name from the request body
      
      // Validate table name
      const validTables = ['users', 'services', 'projects', 'testimonials', 'blog_posts', 'contacts', 'subscribers', 'settings'];
      if (!validTables.includes(tableName)) {
        return res.status(400).json({ error: 'Invalid table name!' });
      }

      // Start a transaction manually with mysql2
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();
        
        for (const row of data) {
          // Build query and values for insertion
          const columns = Object.keys(row);
          const placeholders = columns.map(() => '?').join(', ');
          const values = columns.map(col => row[col]);
          
          const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
          await connection.execute(query, values);
        }
        
        await connection.commit();
        connection.release();
        
        res.status(201).json({ message: 'Data uploaded successfully!', rowsInserted: data.length });
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } else {
      res.status(400).json({ error: 'No data found in the file!' });
    }
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ error: `Failed to upload data: ${error.message}` });
  } finally {
    // Delete the uploaded file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  }
};

module.exports = { uploadData };