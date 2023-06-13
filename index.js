const express = require("express")
const app = express()
const PORT = 4310
const connectDB = require("./config/db")
const bodyParser = require('body-parser');
const visitorsRouter = require('./Router/visitorsRouters')
app.use(bodyParser.json());




app.use('/api/network', visitorsRouter)

connectDB.connect((err)=>{
    if(err) {
        console.log("err", err)
    }
    console.log("db connection is established")
    app.listen(PORT, ()=> {
        console.log("api server is up...")
    })
})