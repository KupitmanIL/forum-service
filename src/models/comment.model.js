import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    user:{
        type: String,
        required: true,
        trim: true
    },
    message:{type: String,
        required: true,
        trim: true
    },
    likes:{
        type: Number,
        default: 0
    }
},{
    _id:false
})

export default commentSchema;