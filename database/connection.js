// connection.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("facetalk", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const authentication = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};

authentication();

export default sequelize;
