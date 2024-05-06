import express from "express";
import { connection } from "../db2/connection.js";
import { userRouter } from "./users/index.js";
const app = express();

app.use(express.json());
app.use("/users", userRouter);

const PORT = process.env.BACKEND_PORT ?? 3000;
app.listen(PORT, async () => {
	console.log("starting on port: ", PORT);
	try {
		// await connection.authenticate();
		await connection.sync({ force: true });
		console.log("db connected!");
	} catch (error) {
		console.log("error", error);
	}
});
