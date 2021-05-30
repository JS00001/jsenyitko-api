const mongoose = require("mongoose");

const scoresSchema = new mongoose.Schema({
    user: String,
    scores: Array
})

module.exports = { name: 'scores', schema: scoresSchema }