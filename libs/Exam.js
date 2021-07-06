const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

const translatte = require('translatte');


 


// mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// import pkg from 'mongodb';
// const { MongoClient } = pkg;

async function app(){

    let ticker1 = 'aapl'
    const result = await yahooFinance.default.quoteSummary(ticker1, { modules: [ "assetProfile" ] },{ validateResult: false });

    const quote1 = await yahooFinance.default.quote(ticker1);

    let country,city,summary

    let name = quote1.displayName;

    if(!quote1.displayName){
		name = quote1.shortName
	}

    await translatte(result.assetProfile.longBusinessSummary, {to: 'ru'}).then(res => {
        //console.log( res.text );
        summary= res.text.substring(0,220) +res.text.substring(220).split('.')[0] 
    }).catch(err => {
        console.error(err);
    });

    console.log(`Компания ${name} из ${result.assetProfile.sector} сектора, головной офис компании находиться в ${result.assetProfile.city}, ${result.assetProfile.country}. ${summary}.`)

}

app()



