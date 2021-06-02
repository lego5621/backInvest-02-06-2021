const mongoose = require('mongoose')
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

module.exports = async function singleCompany( req, res ){

	const ticker = req.params["query"].toLowerCase()
	
	try {

		const statement = await yahooFinance.default.quoteSummary(ticker, { modules: [  "earnings", 'balanceSheetHistory', 'cashflowStatementHistory', 'earningsTrend'] });

		const quote = await yahooFinance.default.quote(ticker, { fields: [ "marketCap", "regularMarketPrice" ]});


		let price = await Company.findOne({ ticker:ticker }, function(err){
			if(err) return console.log(err);
		});


		res.json({
            name: price.name,
            description: price.description,
            avatar: price.avatar,
            ticker: ticker,
            statementAll: getStatement(statement),
            debtRatio: getDebtRatio(statement),
            historicalPrice: price.historicalPrice,
            dividendsPaid: await getDividendYear(ticker),
            statementPrognosis: getStatementPrognosis( quote , statement ),
		});
	} catch(err) {
		// res.status(500).json({
		// 	error: `Error: ${err.message}`,
		// })
        console.log(err.message)
	}
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





async function getDividendYear( ticker){
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
