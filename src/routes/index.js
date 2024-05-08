require("dotenv").config();
const express = require("express");

const userRouter = require("./users");
const db = require("../db2/models");
const imageRouter = require("./images");
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/images", imageRouter);

const PORT = process.env.BACKEND_PORT ?? 3000;
app.listen(PORT, async () => {
  console.log("starting on port: ", PORT);
  try {
    if (process.env.NODE_ENV === "development" || true) await db.sequelize.sync({ force: true });
    else await db.sequelize.authenticate();
    console.log("db connected!");
  } catch (error) {
    console.log("error", error);
  }
});
