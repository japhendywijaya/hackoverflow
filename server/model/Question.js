const mongoose = require('mongoose')
const Schema = mongoose.Schema



const questionSchema = new Schema({
    AuthorId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        unique: true,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    upVotes: [String],
    downVotes:[String],
    createdAt:{
        type:Date
    }


})


const Question = mongoose.model('Question', questionSchema)
module.exports = Question