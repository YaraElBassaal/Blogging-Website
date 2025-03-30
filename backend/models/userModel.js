const mongoose = require("mongoose")
const schema = mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    firstName:{
        type: String,
        required:true,
        minLength:3,
        maxLength:15
    },
    age:{
        type:Number,
        min:13
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("users",schema)
module.exports = User

