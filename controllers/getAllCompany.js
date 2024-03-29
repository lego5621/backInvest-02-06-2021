const mongoose = require('mongoose')
const Company = mongoose.model('Company');
const Idea = mongoose.model('Idea');


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
        const allCompany = await Company.find({ showCompany: true }, function(err){
			if(err) return console.log(err);
		})
            .sort(filterMongo)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        if(allCompany.length == 0){
            return 
        }

        let allIdea = await Idea.find({ }).exec();


        const company = allCompany.map(function(allCompany) {
            let res ={}

            res.name = allCompany.name
            res.description = allCompany.description
            res.city = allCompany.city,
            res.country = allCompany.country,
            res.sector = allCompany.sector,
            res.site = allCompany.website,
            res.overallRisk = allCompany.overallRisk,
            res.ticker = allCompany.ticker
            res.avatar = allCompany.avatar
            res.profitPercentage = allCompany.profitPercentage
            res.recommendationPrice = allCompany.recommendationPrice
            res.currentPrice = allCompany.currentPrice
            res.recommendation = allCompany.recommendation
            res.idea = allIdea.filter(item => item.ticker == allCompany.ticker)
            
            return res
        })
    
        const count = await Company.countDocuments({ showCompany: true });
    
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
