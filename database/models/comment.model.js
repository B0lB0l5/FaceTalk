// comment.model.js
import sequelize from "../connection.js";
import { DataTypes } from "sequelize";

const commentsModel = sequelize.define("comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'posts',  
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',  
      key: 'id'
    }
  }
});

export default commentsModel;
