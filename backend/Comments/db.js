const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:pass@cluster0.j4nfh.mongodb.net/PostDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('open', () => {
    console.log("Connected to Posts DB")
}
    )


const Schema = mongoose.Schema

const commentSchema = Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
})

const Comment = mongoose.model('Comment', commentSchema,'comments')

module.exports = Comment