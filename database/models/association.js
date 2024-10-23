// association.js
import usersModel from "./user.model.js";
import postsModel from "./post.model.js";
import commentsModel from "./comment.model.js";

// User has many Posts
usersModel.hasMany(postsModel, { foreignKey: "authorId" });
postsModel.belongsTo(usersModel, { foreignKey: "authorId" });

// User has many Comments
usersModel.hasMany(commentsModel, { foreignKey: "userId" });
commentsModel.belongsTo(usersModel, { foreignKey: "userId" });

// Post has many Comments
postsModel.hasMany(commentsModel, { foreignKey: "postId" });
commentsModel.belongsTo(postsModel, { foreignKey: "postId" });
