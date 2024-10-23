// post.model.js
import sequelize from "../connection.js";
import { DataTypes } from "sequelize";

const postsModel = sequelize.define("post", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, // Changed to TEXT for potentially larger content
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',  
      key: 'id'
    }
  }
});

export default postsModel;
