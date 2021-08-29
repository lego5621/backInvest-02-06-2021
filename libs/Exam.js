const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2').default;
const moment = require('moment');

const translatte = require('translatte');
moment.locale('ru')

const tipranksApi = require('tipranks-api-v2');




// mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// import pkg from 'mongodb';
// const { MongoClient } = pkg;

async function app(){

    
    let ticker1 = 't'
    const result = await yahooFinance.quoteSummary(ticker1, { modules: [ "summaryDetail" ] },{ validateResult: false });

    console.dir(result, {'maxArrayLength': null})


}

app()



