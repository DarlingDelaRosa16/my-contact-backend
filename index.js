const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config')
const cors = require('cors')

// express
const app = express();

//DATABASE
dbConnection()

//Cors
app.use(cors())

// public
//app.use(express.static('public'))

app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contact'))


// listener 
app.listen( process.env.PORT, ()=>{
    console.log(`Server working on port ${process.env.PORT}`)
});