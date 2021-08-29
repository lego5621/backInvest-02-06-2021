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

	const statement = await yahooFinance.default.quoteSummary(z.ticker, { modules: [  "earnings", 'balanceSheetHistory', 'cashflowStatementHistory', 'earningsTrend', 'assetProfile', 'earningsHistory','upgradeDowngradeHistory', 'financialData', 'summaryDetail', 'recommendationTrend'] },{ validateResult: false });
	const quote = await yahooFinance.default.quote(z.ticker, { fields: [ "marketCap", "regularMarketPrice", "priceToBook", "epsCurrentYear", "forwardPE" ]});

	
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

	let statementPrognosisG = getStatementPrognosis( quote , statement )


	const companyData = {
		name: nameCompany,
		avatar: z.avatar || "",
		description: descriptionChec,
		fullDescription: fullDescription,
		country: statement.assetProfile.country,
		sector: statement.assetProfile.sector,
		ticker: z.ticker.toLowerCase(),
		recommendation: getRecommendation(statement),
		currentPrice: setPrice(price)[setPrice(price).length-1].adjClose,
		recommendationPrice: setPrice(price)[setPrice(price).length-1].adjTargetPrice,
		recommendationTrend: getRecommendationTrend(statement),
		profitPercentage: (recommendationPrice - currentPrice)/recommendationPrice * 100,

		statementAll: getStatement(statement),
		debtRatio: getDebtRatio(statement),
		historicalPrice: setPrice(price),
		dividendsPaid: await getDividendYear(z.ticker),
		statementPrognosis: statementPrognosisG,
		stocks: getstocks(statement),
		analystsGrade: getGrade(statement),
		minRecommendation = statement.financialData.targetLowPrice,
		maxRecommendation = statement.financialData.targetHighPrice,
		website = statement.assetProfile.website,

		showCompany: statementPrognosisG[0].earnings==0 ? false : true,



		// liabCapital: getLiabCapital(statement),
		//otherFactors: getOtherFactors( statement, insights ),
		// site: statement.assetProfile.website,
		// overallRisk: statement.assetProfile.overallRisk,
		// city: statement.assetProfile.city,


	};

	const allCompany = new Company( companyData );

	allCompany.save(function(err){
		// mongoose.disconnect(); 
		if(err) return console.log(err);
		console.log("Компания ", nameCompany);
	});
}

// app()

function getQAnalysis(result){
	const arr = {
        epsActual:result.earningsHistory.history[3].epsActual ,
        epsEstimate:result.earningsHistory.history[3].epsEstimate,
        surprisePercent:result.earningsHistory.history[3].surprisePercent,
    }
	return arr
}

function getLiabCapital(result){
	let getLiabCapital = []

	result.balanceSheetHistory.balanceSheetStatements.forEach(function(item, i, arr) {
		getLiabCapital.push(
			{
				year: item.endDate.getFullYear(),
				totalLiab: item.totalLiab,
				shareCapital: item.totalAssets-item.totalLiab,
			}
		)
	});
	return getLiabCapital
}

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

	let earnings1 = Math.round( (result.marketCap / result.regularMarketPrice) * statement.earningsTrend.trend[2].earningsEstimate.avg )
	let earnings2 = Math.round( (result.marketCap / result.regularMarketPrice) * statement.earningsTrend.trend[3].earningsEstimate.avg )
	
	
	let erning =[  
		{
			year: statement.earningsTrend.trend[2].endDate ? statement.earningsTrend.trend[2].endDate.getFullYear() : null,
			revenue: statement.earningsTrend.trend[2].revenueEstimate.avg,
			earnings: earnings1
		},{
			year: statement.earningsTrend.trend[3].endDate ? statement.earningsTrend.trend[3].endDate.getFullYear() : null,
			revenue: statement.earningsTrend.trend[3].revenueEstimate.avg,
			earnings: earnings2
		} 
	]
	 
	return erning
}



async function getDividendYear(ticker){
	try {
    
		const OptionsDividendHistory = { period1: '2010-01-01', events:'dividends'};
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
			divFun(a,new Date().getFullYear()-4),
			divFun(a,new Date().getFullYear()-5),
			divFun(a,new Date().getFullYear()-6),
			divFun(a,new Date().getFullYear()-7),
			divFun(a,new Date().getFullYear()-8),
			divFun(a,new Date().getFullYear()-9),
			divFun(a,new Date().getFullYear()-10),
		]

		return arrDev

	} catch (err) {
		return arrDev = []
	}
}

function getGrade(result){
	let arr=[]

	if (result.upgradeDowngradeHistory){

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


function getstocks(result){
	let arr = []

    for (let i of result.cashflowStatementHistory.cashflowStatements){
        arr.push({
            date:i.endDate,
            commonStock:i.repurchaseOfStock
        })
    }

	return arr
}



function getRecommendation(recommendationTrend){
	let a = recommendationTrend.recommendationTrend.trend[0]
	if (a.strongBuy + a.buy > a.hold && a.strongBuy + a.buy > a.sell + a.strongSell){
		return 'Покупать'
	}else if (a.strongBuy + a.buy < a.hold && a.sell + a.strongSell < a.hold){
		return 'Держать'
	}else{
		return 'Продавать'
	}
}