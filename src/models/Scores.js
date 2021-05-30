const mongoose = require("mongoose");

const scoresSchema = new mongoose.Schema({
    username: String,
    score: Number,
    timesEntered: Number,
    timesResponded: Number
})

module.exports = { name: 'scores', schema: scoresSchema }