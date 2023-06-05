import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN, // Tengo definido TINYINT en la tabla pero sequelize se ocupa de transformar el boolean en 1 o 0
  },
});

export default User;
