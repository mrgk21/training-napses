import "dotenv/config";
import express from "express";

import db from "../db/models/index.js";
import userRouter from "./users/index.js";
const app = express();

app.use(express.json())
app.use("/users", userRouter);

const PORT = process.env.BACKEND_PORT ?? 3000
app.listen(PORT, async () => {
    console.log("starting on port: ", PORT);
    try {
        await db.sequelize.sync();
        console.log("db synced!")
    } catch (error) {   
        console.log("error", error);
    }
})