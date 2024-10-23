// user.model.js
import sequelize from "../connection.js";
import { DataTypes } from "sequelize";

const usersModel = sequelize.define("user", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  
  },
  status: {
    type: DataTypes.ENUM('logged_in', 'logged_out'),
    defaultValue: 'logged_out',  
  },
});

export default usersModel;
