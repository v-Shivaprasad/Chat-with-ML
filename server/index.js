const express =  require('express');
const cors = require('cors');
const Routerroutes = require('./Router/Routes');
const connectDb = require('./Db/connectdb');
const PORT = process.env.PORT || 3000;

const app=express();
app.use(cors());
app.use(express.json());

connectDb();
app.use('/api',Routerroutes);
app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`)
});