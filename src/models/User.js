const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: Number,
    ign: String,
    username: String,
    lastChangedUsername: Number,
    events: Array
})

module.exports = { name: 'users', schema: userSchema }