const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URI;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("database connected");
}).catch((error) =>{
    console.log("error", error);
})