const { Schema, model } = require("mongoose");


const userSchema = new Schema ({
  name: { 
      type: String, 
      required: true 
  },
  password: {
      type: String,
      required: true
  },
  city: {
      type: String,
      required: true
  },
  image: String,
  info: String,
  pinPersonal: [ { type: Schema.Types.ObjectId, ref: "Post" } ],
  pinFav: [ { type: Schema.Types.ObjectId, ref: "Post" } ],
  admin: Boolean,
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
