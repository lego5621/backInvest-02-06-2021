const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// import pkg from 'mongodb';
// const { MongoClient } = pkg;

async function app(){
	let allCompany = await Company.find()
	let d =  new Date(Date.now()-86400000)
	// let d =  new Date()
	

	d= d.toJSON().split("T")[0]
	
	console.log(d)

	// d = '2021-07-02'

	// for (let i of allCompany){
	allCompany.forEach(async (i) => {

		let company = await Company.findOne({ ticker:i.ticker }, function(err){
			if(err) return console.log(err);
		});
		const queryOptions = { period1: d };
	
		let price = await yahooFinance.default.historical(i.ticker, queryOptions);

		let statement = await yahooFinance.default.quoteSummary(i.ticker, { modules: [ "earnings", 'balanceSheetHistory', 'cashflowStatementHistory', 'earningsTrend'] });
		let quote = await yahooFinance.default.quote(i.ticker, { fields: [ "marketCap", "regularMarketPrice" ]});

		let recommendationTrend = await yahooFinance.default.quoteSummary(i.ticker, { modules: [  "recommendationTrend", "assetProfile"] });
		let targetMedianPrice = await yahooFinance.default.quoteSummary(i.ticker, { modules: [  "financialData", ] });


		company.recommendationPrice = targetMedianPrice.financialData.targetMedianPrice		
		
		company.recommendationTrend = getRecommendationTrend(recommendationTrend)
		company.statementAll = getStatement(statement)
		company.debtRatio = getDebtRatio(statement)
		company.auditRisk = recommendationTrend.assetProfile.auditRisk
		company.dividendsPaid = await getDividendYear( company.ticker )
		company.statementPrognosis = getStatementPrognosis( quote , statement )
		company.profitPercentage = Math.floor((targetMedianPrice.financialData.targetMedianPrice - price[0].adjClose)/targetMedianPrice.financialData.targetMedianPrice * 100);
		
		company.historicalPrice.push({
			date: price[0].date,
			adjClose: price[0].adjClose,
			adjTargetPrice: targetMedianPrice.financialData.targetMedianPrice
		})

		// console.dir(company, {'maxArrayLength': null});

		company.save(function(err){
			// mongoose.disconnect(); 
			if(err) return console.log(err);
			console.log("Сохранен объект");
		});
	})
}

app()


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
