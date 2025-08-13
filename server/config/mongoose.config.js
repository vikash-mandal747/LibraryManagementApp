const  mongoose  = require("mongoose");

const DBCon = async ()=>{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
}

module.exports = DBCon;