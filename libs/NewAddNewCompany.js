const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');
const translatte = require('translatte');
const moment = require('moment');


moment.locale('ru')

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

	const statement = await yahooFinance.default.quoteSummary(z.ticker, { modules: [  "earnings", 'balanceSheetHistory', 'cashflowStatementHistory', 'earningsTrend', 'assetProfile', 'earningsHistory','upgradeDowngradeHistory', 'financialData', 'summaryDetail'] },{ validateResult: false });
	const quote = await yahooFinance.default.quote(z.ticker, { fields: [ "marketCap", "regularMarketPrice", "priceToBook", "epsCurrentYear", "forwardPE" ]});

	// const queryOptionsInsights = { lang: 'en-US', reportsCount: 2, region: 'US' };
	// const insights = await yahooFinance.default.insights(z.ticker, queryOptionsInsights,{ validateResult: false });

	// const recommendationTrend = await yahooFinance.default.quoteSummary(z.ticker, { modules: [  "recommendationTrend", ] });


	
	let nameCompany= quote1.displayName;
	
	if(!quote1.displayName){
		nameCompany= quote1.shortName
	}

	let currentPrice = setPrice(price)[setPrice(price).length-1].adjClose;
	let recommendationPrice = setPrice(price)[setPrice(price).length-1].adjTargetPrice;

	let descriptionChec = ""
	let fullDescription = ""

	await translatte(statement.assetProfile.longBusinessSummary, {to: 'ru'}).then(res => {
		descriptionChec = res.text.substring(0,220) +res.text.substring(220).split('.')[0] 
		fullDescription = res.text
	}).catch(err => {
		console.log(`${nameCompany} перевод не добавлен`)
	});

	if(z.description){
		descriptionChec = z.description
	}


	const allCompany = new Company({
		name: nameCompany,
		avatar: z.avatar || "",
		description: descriptionChec,
		fullDescription: fullDescription,
		
		// city: statement.assetProfile.city,
		country: statement.assetProfile.country,
		sector: statement.assetProfile.sector,
		// site: statement.assetProfile.website,
		// overallRisk: statement.assetProfile.overallRisk,

		ticker: z.ticker.toLowerCase(),
		currentPrice: setPrice(price)[setPrice(price).length-1].adjClose,
		recommendationPrice: setPrice(price)[setPrice(price).length-1].adjTargetPrice,
		//recommendationTrend: getRecommendationTrend(recommendationTrend),
		profitPercentage: (recommendationPrice - currentPrice)/recommendationPrice * 100,

		statementAll: getStatement(statement),
		//debtRatio: getDebtRatio(statement),
		historicalPrice: setPrice(price),
		//dividendsPaid:await getDividendYear(z.ticker),
		statementPrognosis: getStatementPrognosis( quote , statement ),
		//otherFactors: getOtherFactors( statement, insights ),
		//analystsGrade: getGrade(statement)

		ROA: statement.financialData.returnOnAssets*100,
		ROE: statement.financialData.returnOnEquity*100,
		ROS: statement.financialData.grossProfits/statement.financialData.totalRevenue*100,
		PE: statement.summaryDetail.trailingPE,
		PB: quote.priceToBook,
		PS: quote.marketCap/statement.financialData.totalRevenue,
		DE: statement.financialData.debtToEquity || 0,

	});

	allCompany.save(function(err){
		// mongoose.disconnect(); 
		if(err) return console.log(err);
		console.log("Компания ", nameCompany);
	});
}

// app()

function getOtherFactors( result, insights ){
	let obj={}

	obj.earningsQuarterly = {
		epsActual: result.earningsHistory.history[3].epsActual,
		epsEstimate: result.earningsHistory.history[3].epsEstimate,
		surprisePercent: result.earningsHistory.history[3].surprisePercent,
	}

	try {
		obj.redemptionShares = Math.abs(result.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock) > result.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock 
	} catch (err) {
		obj.redemptionShares = false 
	}

	try {
		if(insights.instrumentInfo.technicalEvents.shortTermOutlook.direction == 'Bullish'){
			obj.shortNewsBackground = true
		}else{
			obj.shortNewsBackground = false
		}
	} catch (err) {
		obj.shortNewsBackground = false
	}

	try {
		if(insights.instrumentInfo.technicalEvents.longTermOutlook.direction == 'Bullish'){
			obj.longNewsBackground = true
		}else{
			obj.longNewsBackground = false
		}
	} catch (err) {
		obj.longNewsBackground = false
	}

	return obj
}


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
                percent: Math.round((item.totalLiab / item.totalAssets) * 100)
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

		function divFun( a, Year ){
			let arr = []
			for( let value of a ){
				if( value.date.getFullYear() == Year) {
					arr.push(value)		
				}
			}
			
			let sum = { year: Year, percent:0}
			
			for(let i of arr){
				sum.percent = sum.percent + i.dividends
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

function getGrade(result){
	let arr=[]

	for( let i of result.upgradeDowngradeHistory.history ){
		if(toStr(i.toGrade )){
			arr.push({
				date: moment(i.epochGradeDate).locale("ru").format("L"),
				toGrade: i.toGrade,
				firm: i.firm,
				text: false,
			})
			if(arr.length == 5) break
		}
	}

	function toStr(str){
		if(str == 'Overweight')return true
		if(str == 'Buy')return true
		if(str == 'Outperform')return true
		if(str == 'Sell')return true
		return false
	}
	return arr
}
