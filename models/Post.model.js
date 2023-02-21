const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    image: [String],
    namePlace: {
        type: String,
        required: true
    },
    nameCategory: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    usersComments: [ { type: Schema.Types.ObjectId, ref: "Comment" } ],
    author: { type: Schema.Types.ObjectId, ref: "User" },
},
    {
        timestamps: true
    }
)

const Post = model("Post", postSchema);

module.exports = Post;