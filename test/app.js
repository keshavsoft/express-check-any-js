import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';

import { StartFunc as StartFuncFromWebSocketServer } from "./Projects/WebSocketServer/V2/entryFile.js";

const app = express()

const server = http.createServer(app);

var port = normalizePort(process.env.PORT || 3000);

app.use(express.static('Public'));
app.use(cookieParser());

StartFuncFromWebSocketServer(server);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Open here http://localhost:${port}`);
});