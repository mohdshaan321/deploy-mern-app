const { string, required } = require("joi");
const mongooose = require("mongoose")

const Schema = mongooose.Schema;

const UserSchema = new Schema({
      name: {
        type : String,
        required: true
      },
      email : {
        type : String,
        required: true,
        unique: true
      },
      password : {
        type : String,
        required: true
      }
  

})

const UserModel = mongooose.model("users", UserSchema)

module.exports = UserModel;