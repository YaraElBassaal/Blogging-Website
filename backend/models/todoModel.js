const mongoose = require("mongoose")

const schema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    },
    title:{
        type:String,
        required:true,
        minLength: 5,
        maxLength:20,
        index:true
    },
    status:{
        type:String,
        default: 'to-do'
    },
    tags:[{
        type: String,
        minLength: 10
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Todo = mongoose.model("todos",schema)
module.exports = Todo