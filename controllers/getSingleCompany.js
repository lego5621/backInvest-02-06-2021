const mongoose = require('mongoose')
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

module.exports = async function singleCompany( req, res ){

	const ticker = req.params["query"].toLowerCase()
	
	try {

		let price = await Company.findOne({ ticker:ticker }, function(err){
			if(err) return console.log(err);
		});


		res.json({
            name: price.name,
            description: price.description,
            avatar: price.avatar,
            ticker: ticker,
            statementAll:price.statementAll,
            debtRatio: price.debtRatio,
            historicalPrice: price.historicalPrice,
            dividendsPaid: price.dividendsPaid,
            statementPrognosis: price.statementPrognosis,
		});
	} catch(err) {
		res.status(500).json({
			error: `Error: ${err.message}`,
		})
        console.log(err.message)
	}
}



