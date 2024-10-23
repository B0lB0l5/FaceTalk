import express from "express";
import sequelize from "./database/connection.js";
import usersRouter from "./src/modules/user/normal user/user.router.js";
import postsRouter from "./src/modules/post/post.router.js";
import commentsRouter from "./src/modules/comment/comment.router.js";
import adminRouter from "./src/modules/user/admin/admin.router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/admin', adminRouter)
app.use("/user", usersRouter);
app.use("/post", postsRouter);
app.use("/comment", commentsRouter);

sequelize
  .sync({ alter: false, force: false })
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((error) => console.error("Unable to sync database:", error));
