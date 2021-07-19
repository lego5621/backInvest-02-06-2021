const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');
const moment = require('moment');

const translatte = require('translatte');
moment.locale('ru')


 


// mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// import pkg from 'mongodb';
// const { MongoClient } = pkg;

async function app(){

    
    let ticker1 = 'aapl'
    const result = await yahooFinance.default.quoteSummary(ticker1, { modules: [ "earningsHistory" ] },{ validateResult: false });

    const arr = {
        epsActual:result.earningsHistory.history[3].epsActual,
        epsEstimate:result.earningsHistory.history[3].epsEstimate,
        surprisePercent:result.earningsHistory.history[3].surprisePercent,
    }
    

    console.log(arr)
    
}

app()



