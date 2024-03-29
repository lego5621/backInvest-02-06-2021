const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanyScheme = new Schema({
	name: String,
	description: String,
	fullDescription: String,
	country: String,
	sector: String,
	ticker: String,
	avatar: String,
	recommendation: String,
	recommendationAnalCaunt: Number,
	recommendationPrice: Number,
	minRecommendation: Number,
	maxRecommendation: Number,
	website: String,
	profitPercentage: Number,
	currentPrice: Number,
	recommendationText: String,
	showCompany: Boolean,
	stocks:{
		type:Array,
		default: undefined
	},
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
		type: Array,
		default: undefined
	},
	statementPrognosis:{
		type:Object,
		default: undefined
	},
	/*otherFactors:{
		type:Object,
		default: undefined
	},*/
	analystsGrade:{
		type: Array,
		default: undefined
	},

});

mongoose.model("Company", CompanyScheme);