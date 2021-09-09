const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const IdeaScheme = new Schema({

    ticker: String,
    name : String,
    logo: String,
    url: String,
    description: String,
    recom: String,
    profitPros: String,
    time: String
});

mongoose.model("Idea", IdeaScheme);