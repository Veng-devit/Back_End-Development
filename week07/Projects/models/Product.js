import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define(             // .define() maps a JS object to a table
  'Produce',                                    // model name (Sequelize uses this as the table name)
  {
    name: {
      type: DataTypes.STRING,                  // STRING
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,                  // FLOAT
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,                    // 0
    },
  }
);

export default Product;