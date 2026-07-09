import sequelize from '../config/database.js';

try {
  await sequelize.authenticate();        // authenticate()
  console.log('Database connected successfully!');
} catch (err) {
  console.error('Connection failed:', err);
}