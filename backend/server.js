const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors');
const connectDB = require('./connectDB'); 
require('dotenv').config();
const PORT= process.env.PORT;
const server = express();


server.use(bodyParser.json({ limit: '10mb' }));
server.use(express.urlencoded({extended:true}))
server.use(morgan('dev'));

// เชื่อมต่อฐานข้อมูล
connectDB();

server.use(cors({
    origin:'http://localhost:4200'
  }));


// สำหรับ function หลาย route
readdirSync('./routes')
.map((r) => {
    const route = require('./routes/' + r);
    server.use('/api', route);
});

server.listen(PORT, (error) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

module.exports = server;
