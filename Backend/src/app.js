const express = require("express");
const aiRouter = require('./routes/ai.route');
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
}));

app.use('/ai', aiRouter);


module.exports = app