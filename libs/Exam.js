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

    
    let ticker1 = 'GAZP.ME'
    const result = await yahooFinance.quoteSummary(ticker1, { modules: [ "upgradeDowngradeHistory" ] });

    function getGrade(result){
        let arr=[]
    
        if (result.upgradeDowngradeHistory.history){
    
            for( let i of result.upgradeDowngradeHistory.history ){
                arr.push({
                    date: moment(i.epochGradeDate).locale("ru").format("L"),
                    toGrade: i.toGrade,
                    firm: i.firm,
                    text: false,
                })
                if(arr.length == 5) break
            }
        }
    
        return arr
    }

    console.log(getGrade(result))


}

app()



