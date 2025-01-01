const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL

mongoose.connect(mongo_url)
.then(()=>{
    console.log("MONGO DB is connected")
}).catch((err)=>{
console.log(`MONGO DB error..${err}`)
})