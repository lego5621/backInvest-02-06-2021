const mongoose = require('mongoose')
const Company = mongoose.model('Company');

module.exports = async function allStocks( req, res ){
    try {
        const allCompany = await Company.find();


        if(allCompany.length == 0){
            return 
        }


        const company = allCompany.map(function(allCompany) {
            let res ={}
            res.name = allCompany.name
            res.ticker = allCompany.ticker
            return res
        })
        
        res.json({
            company,
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `Error: ${err.message}`,
        })
    }
}
