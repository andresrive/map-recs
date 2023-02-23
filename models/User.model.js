const { Schema, model } = require("mongoose");


const userSchema = new Schema ({
  username: { 
      type: String, 
      required: true,
      unique: true 
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    // required: true
  },
  interests: String,
  image: String,
  info: String,
  pinPersonal: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  pinFav: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  admin: Boolean,
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
