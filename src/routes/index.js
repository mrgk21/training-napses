require("dotenv").config();
const express = require("express");

const userRouter = require("./users");
const db = require("../db2/models");
const app = express();

app.use(express.json());
app.use("/users", userRouter);

const PORT = process.env.BACKEND_PORT ?? 3000;
app.listen(PORT, async () => {
  console.log("starting on port: ", PORT);
  try {
    await db.sequelize.authenticate();
    // await db.sequelize.sync({ force: true });
    console.log("db connected!");
  } catch (error) {
    console.log("error", error);
  }
});
