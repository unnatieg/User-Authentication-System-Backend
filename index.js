const express= require('express');
const app=express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const UserRoute = require ('./routes/userRoutes');
const db = require('./config/database.config');
require('dotenv').config();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', UserRoute);

app.get('/', (req,res)=>
{
    res.status(200);
    res.send("Welcome to root URL of the server")
})

app.get("/*any",(req,res)=>
{
    res.send("If any other route, come here.")
})


app.listen(PORT, (err)=>
{
    if(!err)
    {
        console.log("Server setup successful! App is listening on PORT ", PORT);
    }
    else{
        console.log("Server not connected ", err);
    }
})