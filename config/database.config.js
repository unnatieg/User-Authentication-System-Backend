const mongoose= require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/CRUD-April7')
.then(()=> {
    console.log('DB CONNECTED'); })
.catch((err)=>
{
    console.log('error in connecting with database ', err)

})



module.exports = connection;