import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';

const app = express()

const server = http.createServer(app);

var port = normalizePort(process.env.PORT || 3000);
app.use(express.static('Public'));
app.use(cookieParser());

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
