import https from "https";
import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerconfig from "./config/SwaggerUiDocs.js";
import ConnectDatabse from "./config/Database.js";
import upload from "./config/Multer.js";
import { IO } from "./config/Socket.js";
import userRouter from "./routes/userRouter.js";
import fs from "fs";
import NotificationJob from "./service/MessagingService/Index.js";
import walletRouter from "./routes/walletsRouter.js";
//---------------------CONFIGURE SERVER WITH NO CERTIFICATE FOR HTTP AND CERTIFICATE FOR HTTPS
const sslOptions = {
    pfx: fs.readFileSync("test_cert.pfx"),
    passphrase: "sample",
};
const app = express();
const server = http.createServer(app);
const httpsserver = https.createServer(sslOptions, app);
//-------------------- SET UP THE MIDDLEWARE PLUS INITIALIZE SOCKET IO
const io = IO(server);
app.use(cors());
app.use(express.json());
app.use(upload.any());
//------------------ SET UP ROUTES
app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerconfig);
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerconfig));
app.use("/", userRouter);
app.use("/", walletRouter);
// -------------- SETUP DATABASE CONNECTION AND MAKE SERVER LISTEN
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const HTTPS_PORT = process.env.HTTPS_PORT
    ? parseInt(process.env.HTTPS_PORT, 10)
    : 5100;
const uri = process.env.DB_URI ? process.env.DB_URI : "";
ConnectDatabse(server, httpsserver, PORT, HTTPS_PORT, uri);
NotificationJob(io);
