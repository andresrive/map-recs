const {Schema, model} = require("mongoose");

const commentSchema = new Schema ({
    title: {
        type: String, 
        required: true 
    },
    comment: {
        type: String, 
        required: true 
    },
    image: String,
    author:{ type: Schema.Types.ObjectId, ref: "User" }
},
{
    timestamps: true
}
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;