const express = require("express"); 
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');
const AuthRouter = require("./Routes/AuthRouter")
const ProductRouter = require('../backend/Routes/ProductRouter')


require('dotenv').config()
require("./Models/db")

app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to your frontend's URL
}));
app.use(bodyParser.json())


const PORT = process.env.PORT || 8085;

app.get("/ping",(req,res)=>{
    res.send("PONG")
})



app.use("/auth",AuthRouter)
app.use('/products',ProductRouter)



app.listen(PORT,()=>{
console.log(`server is connected with the PORT ${PORT}`);
})