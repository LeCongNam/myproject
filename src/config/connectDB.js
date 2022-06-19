const {createPool} = require('mysql2')
const config = require('./db.config')

try {
   var pool =  createPool(config);
   
    console.log('DB connected');    
} catch (error) {
    console.log('DB connect Failse!', error);
}



module.exports = pool