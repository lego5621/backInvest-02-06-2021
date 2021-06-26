const mongoose = require('mongoose')
const Company = mongoose.model('Company');

module.exports = async function allStocks( req, res ){
    let { page = 1, limit = 5, filter = ''} = req.query;
    page = Math.ceil(page)
    let filterMongo = ''

    if(filter=='maxPrice'){
        filterMongo = { currentPrice: -1 }
    }

    if(filter=='minPrice'){
        filterMongo = { currentPrice: 1 }
    }

    if(filter=='maxProfit'){
        filterMongo = { profitPercentage: -1 }
    }

    try {
        const allCompany = await Company.find()
            .sort(filterMongo)
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
            res.profitPercentage = allCompany.profitPercentage
            res.recommendationPrice = allCompany.recommendationPrice
            res.currentPrice = allCompany.currentPrice
            
            return res
        })
    
        const count = await Company.countDocuments();
    
        res.json({
            company,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `Error: ${err.message}`,
        })
    }
}
