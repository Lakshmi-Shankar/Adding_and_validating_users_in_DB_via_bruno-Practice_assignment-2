const Mongoose = require("mongoose");

const suserSchema = Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Mongoose.model("User", suserSchema);