const mongoose = require('mongoose');

const dbConnection = async()=>{

    console.log(process.env.DB_CNN)
    
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Db Online')

    } catch (error) {
        console.log(error)
        throw new Error('Error trying to connect whit the DB')
    }
}

module.exports ={
    dbConnection
}