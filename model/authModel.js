const mongoose = require("mongoose")
const { isEmail, isStrongPassword } = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: isEmail,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: isStrongPassword
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User




