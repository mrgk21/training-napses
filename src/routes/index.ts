import express from "express";
import { sequelize } from "src/db2/models/index.js";
import userRouter from "src/routes/users/index.js";
const app = express();

app.use(express.json())
app.use("/users", userRouter);

const PORT = process.env.BACKEND_PORT ?? 3000
app.listen(PORT, async () => {
    console.log("starting on port: ", PORT);
    try {
        await sequelize.authenticate();
        // await sequelize.sync({force: true});
        console.log("db connected!")
    } catch (error) {   
        console.log("error", error);
    }
})