const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Attach io to request object for use in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Use routes
app.use('/api', routes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
