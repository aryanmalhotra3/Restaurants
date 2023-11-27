const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

// Sequelize configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'ycyc',
  database: 'restaurant_db',
});

//Restaurant model
const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  }}  , {
    timestamps: false,
});


app.use(cors());
app.use(bodyParser.json());


app.post('/savedata', async (req, res) => {
  const { name, address, contact } = req.body;

  try {
    const restaurant = await Restaurant.create({
      name,
      address,
      contact,
    });

    console.log('Data saved successfully:', restaurant.toJSON());
    return res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/showdata', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();

    console.log('Data fetched successfully:', restaurants.map((r) => r.toJSON()));
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;

  try {
    await Restaurant.update(
      { name, address, contact },
      {
        where: {
          id,
        },
      }
    );

    console.log('Data updated successfully');
    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Restaurant.destroy({
      where: {
        id,
      },
    });

    console.log('Data deleted successfully');
    return res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
