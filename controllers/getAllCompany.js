const mongoose = require('mongoose')
const Company = mongoose.model('Company');

module.exports = async function allStocks( req, res ){
    let { page = 1, limit = 5} = req.query;

    page = Math.ceil(page)

    try {
        const allCompany = await Company.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        if(allCompany.length == 0){
            return 
        }


        const company = allCompany.map(function(allCompany) {
            let res ={}

            res.name = allCompany.name
            res.description = allCompany.description
            res.ticker = allCompany.ticker
            res.avatar = allCompany.avatar
            res.recommendationPrice = allCompany.historicalPrice[allCompany.historicalPrice.length - 1].adjClose
            res.currentPrice = allCompany.historicalPrice[allCompany.historicalPrice.length - 1].adjTargetPrice
            
            return res
        })
    
        const count = await Company.countDocuments();
    
        res.json({
            company,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
        
    } catch (err) {
        res.status(500).json({
            error: `Error: ${err.message}`,
        })
    }
}
