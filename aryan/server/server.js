const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aryan',
  database: 'restaurant_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/savedata', (req, res) => {
    console.log("/savedata is called");
  const { name, address, contact } = req.body;

  if (!name || !address || !contact) {
    return res.status(400).json({ message: 'Name, address, and contact are required' });
  }

  const sql = 'INSERT INTO restaurants (name, address, contact) VALUES (?, ?, ?)';
  db.query(sql, [name, address, contact], (err, result) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    console.log('Data saved successfully');
    return res.status(200).json({ message: 'Data saved successfully' });
  });
});

app.get('/showdata', (req, res) => {
  const sql = 'SELECT * FROM restaurants';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json(results);
  });
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;

  const sql = 'UPDATE restaurants SET name=?, address=?, contact=? WHERE id=?';
  db.query(sql, [name, address, contact, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Data updated successfully' });
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM restaurants WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Data deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
