const mongoose = require('mongoose')
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

module.exports = async function singleCompany( req, res ){

	const ticker = req.params["query"].toLowerCase()
	
	try {

		let price = await Company.findOne({ ticker:ticker, showCompany: true }, function(err){
			if(err) return console.log(err);
		});


		res.json({
            name: price.name,
            description: price.description,
			fullDescription: price.fullDescription,
			//city : price.city,
            country : price.country,
            sector : price.sector,
            //site : price.site,
			//overallRisk: price.overallRisk,
            avatar: price.avatar,
            ticker: ticker,
            statementAll:price.statementAll,
            debtRatio: price.debtRatio,
            historicalPrice: price.historicalPrice,
            dividendsPaid: price.dividendsPaid,
            statementPrognosis: price.statementPrognosis,
			recommendationTrend: recommendationTrend(price.recommendationTrend),
			profitPercentage: price.profitPercentage,
			recommendationPrice: price.recommendationPrice,
			recommendation: price.recommendation,
			//otherFactors: price.otherFactors,
			analystsGrade:price.analystsGrade,
			stocks: price.stocks
		});
	} catch(err) {
		res.status(404).json({
			error: `Error: ${err.message}`,
		})
        console.log(err.message)
	}
}


function recommendationTrend(recommendationTrend){

	let result = [[],[],[],[]]

	for (let mon of recommendationTrend){
		result[0].push(
			mon.buy,
		)
	}
	for (let mon of recommendationTrend){
		result[1].push(
			mon.hold,
		)
	}
	for (let mon of recommendationTrend){
		result[2].push(
			mon.sell,
		)
	}
	for (let mon of recommendationTrend){
		result[3].push(
			mon.strongBuy,
		)
	}


	result[0]=result[0].reverse()
	result[1]=result[1].reverse()
	result[2]=result[2].reverse()
	result[3]=result[3].reverse()



	return result
}



