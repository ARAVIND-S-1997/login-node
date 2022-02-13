
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { signupRouter } from "./signup.js";
import { loginRouter } from "./login.js";
import { forgetPasswordRouter} from "./forgetpassword.js"
import {changepasswordRouter } from "./changePassword.js"
dotenv.config();


// Express connection
const server = express();
const PORT = process.env.PORT;
server.listen(PORT, () => { console.log("Running on PORT:9000") });

// Middle ware

server.use(express.json());
server.use(cors());
server.use("/user", signupRouter);
server.use("/user", loginRouter)
server.use("/user", forgetPasswordRouter)
server.use("/user", changepasswordRouter)


// Mongodb connection
const mongo_url = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(mongo_url);
    await client.connect();
    console.log("MongoDB is connected");
    return client;
}

export const client = await createConnection();

