const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// import pkg from 'mongodb';
// const { MongoClient } = pkg;

module.exports = async function app(z){

	function setPrice(price){
		let historicalPrice = [];
		price.forEach(function(item, i, arr) {
			historicalPrice.push(
				{
					date: item.date,
					adjClose: item.adjClose,
					adjTargetPrice: item.adjClose,
				}
			)
		});

		return historicalPrice
	}

	let d = new Date();
	d =  new Date(d.setMonth(d.getMonth() - 18))
	d= d.toJSON().split("T")[0]
	
	
	console.log('Начало котировок с ',d)
	
	
	// const ticker = 't';
	// const description = "afsdfsdfasdf"
	// const avatar = "https://s3-symbol-logo.tradingview.com/apple--600.png"
	const queryOptions = { period1: d};

	const price = await yahooFinance.default.historical(z.ticker, queryOptions);
	const quote1 = await yahooFinance.default.quote(z.ticker);

	const statement = await yahooFinance.default.quoteSummary(z.ticker, { modules: [  "earnings", 'balanceSheetHistory', 'cashflowStatementHistory', 'earningsTrend'] });
	const quote = await yahooFinance.default.quote(z.ticker, { fields: [ "marketCap", "regularMarketPrice" ]});

	const recommendationTrend = await yahooFinance.default.quoteSummary(z.ticker, { modules: [  "recommendationTrend", ] });


	
	let nameCompany= quote1.displayName;
	
	if(!quote1.displayName){
		nameCompany= quote1.shortName
	}

	let currentPrice = setPrice(price)[setPrice(price).length-1].adjClose;
	let recommendationPrice = setPrice(price)[setPrice(price).length-1].adjTargetPrice;

	const allCompany = new Company({
		name: nameCompany,
		avatar: z.avatar,
		description: z.description,
		ticker: z.ticker.toLowerCase(),
		currentPrice: setPrice(price)[setPrice(price).length-1].adjClose,
		recommendationPrice: setPrice(price)[setPrice(price).length-1].adjTargetPrice,
		recommendationTrend: getRecommendationTrend(recommendationTrend),
		profitPercentage: (recommendationPrice - currentPrice)/recommendationPrice * 100,

		statementAll: getStatement(statement),
		debtRatio: getDebtRatio(statement),
		historicalPrice: setPrice(price),
		dividendsPaid: await getDividendYear(z.ticker),
		statementPrognosis: getStatementPrognosis( quote , statement ),
	});

	allCompany.save(function(err){
		// mongoose.disconnect(); 
		if(err) return console.log(err);
		console.log("Сохранен объект");
	});
}

// app()


function getRecommendationTrend(recommendationTrend){
	let result = []

	for (let i of recommendationTrend.recommendationTrend.trend){
		result.push(
			{
				period: i.period,
				buy : i.strongBuy + i.buy,
				hold : i.hold,
				sell : i.sell + i.strongSell
			}
		)
	}

	return result
}



// выручка чп
function getStatement(statement){
	let setStatement = []

	statement.earnings.financialsChart.yearly.forEach(function(item, i, arr) {
		setStatement.push(
		   {
			   year: item.date,
			   revenue: item.revenue,
			   earnings: item.earnings,
		   }
		)
	});
	return setStatement ;
}




// Долг к активам
function getDebtRatio(result){
    let TotalDebtRatio = []

	result.balanceSheetHistory.balanceSheetStatements.forEach(function(item, i, arr) {
        TotalDebtRatio.push(
            {
                year: item.endDate.getFullYear(),
                percent: Math.round((item.totalLiab / item.totalAssets)  * 100)
            }
        )
	});
	return TotalDebtRatio
}
 




function getStatementPrognosis(result,  statement){

    let earnings = Math.round( (result.marketCap / result.regularMarketPrice) * statement.earningsTrend.trend[2].earningsEstimate.avg )
    
    
    let erning =  {
        year: statement.earningsTrend.trend[2].endDate ? statement.earningsTrend.trend[2].endDate.getFullYear() : null,
        revenue: statement.earningsTrend.trend[2].revenueEstimate.avg,
        earnings: earnings
	}
     
    return erning
}





async function getDividendYear(ticker){
    try {

        const OptionsDividendHistory = { period1: '2016-01-01', events:'dividends'};
        const quote = await yahooFinance.default.historical( ticker, OptionsDividendHistory,{ validateResult: false });

        let a =	quote.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });

        function divFun( a, Year){
            let arr = []
            for( let value of a ){
                if( value.date.getFullYear() == Year) {
                    arr.push(value)		
                }
            }
            
            let sum = { year: Year, percent:0}
            
            for(let i of arr){
                sum.percent= sum.percent+i.dividends
            }

            sum.percent = sum.percent.toFixed(2)

            return sum
        }
        
        let arrDev = [
            divFun(a,new Date().getFullYear()-1),
            divFun(a,new Date().getFullYear()-2),
            divFun(a,new Date().getFullYear()-3),
            divFun(a,new Date().getFullYear()-4)
        ]

        return arrDev

    } catch (err) {
        return arrDev = [{ year: null, percent:null}]
    }
}
