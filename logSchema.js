const Mongoose = require("mongoose");

const luserData = Mongoose.Schema({
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
    }
})

module.exports = Mongoose.model("userLogin", luserData);