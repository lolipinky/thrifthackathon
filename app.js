
import express from 'express';
import { PORT } from './config/env.js'
import {connectDb} from './database/mongodb.js'
import dotenv from "dotenv"
import createRouter from './routes/createAccRoute.js';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import cors from "cors"

const app = express();
app.use(express.json());
dotenv.config()
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5000",
    credentials: false,
    methods: ['GET', "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.urlencoded({extended: true}))
app.use("/api/v1/account", createRouter )

app.listen(PORT,() =>{
    connectDb()
    console.log("server is running")
})