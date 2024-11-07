require('dotenv').config();
const express = require('express')
const app = express();
const router = require("./routes");
const DbConnect = require('./database')
const cors = require('cors')



const options={
    origin: ['http://localhost:3000']
}
app.use(cors(options));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json());
app.use(router);


app.get("/",(req,res)=>{
    res.send("This is from home.")
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})