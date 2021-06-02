const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanyScheme = new Schema({
	name: String,
	description: String,
	ticker: String,
	avatar:String,
	historicalPrice:  {
		type:Object,
		default: undefined
	},
});

mongoose.model("Company", CompanyScheme);