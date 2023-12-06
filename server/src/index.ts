import express, { Application } from "express";
import cors from "cors";

const server: Application = express();

server.use(cors({ origin: '*' }));
server.use(express.static('share'));
server.use('/script', express.static('script'));

server.listen(4200, () => {
    console.log("Server listening");
});