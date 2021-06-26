const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanyScheme = new Schema({
	name: String,
	description: String,
	ticker: String,
	avatar: String,
	recommendationPrice: Number,
	profitPercentage: Number,
	currentPrice: Number,
	recommendationTrend:{
		type:Object,
		default: undefined
	},
	statementAll:{
		type:Object,
		default: undefined
	},
	debtRatio:{
		type:Object,
		default: undefined
	},
	historicalPrice:{
		type: Array,
		default: undefined
	},
	dividendsPaid:{
		type:Object,
		default: undefined
	},
	statementPrognosis:{
		type:Object,
		default: undefined
	},
});

mongoose.model("Company", CompanyScheme);