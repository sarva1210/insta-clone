const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exists"],
        required:[true, "username is requied"]
    },
    email:{
        type:String,
        unique:[true, "Email already exists"],
        required:[true, "Email is requied"]
    },
    password:{
        type:String,
        required:[true, "Password is requied"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/sarva1210/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.webp"
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel