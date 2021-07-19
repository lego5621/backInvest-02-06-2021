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
	recommendationPrice: Number,
	profitPercentage: Number,
	currentPrice: Number,
	recommendationText: String,
	QAnalysis:{
		type:Array,
		default: undefined
	},
	liabCapital:{
		type:Array,
		default: undefined
	},
	/*recommendationTrend:{
		type:Object,
		default: undefined
	},*/
	statementAll:{
		type:Object,
		default: undefined
	},
	/*debtRatio:{
		type:Object,
		default: undefined
	},*/
	historicalPrice:{
		type: Array,
		default: undefined
	},
	/*dividendsPaid:{
		type:Object,
		default: undefined
	},*/
	statementPrognosis:{
		type:Object,
		default: undefined
	},
	/*otherFactors:{
		type:Object,
		default: undefined
	},*/
	/*analystsGrade:{
		type: Array,
		default: undefined
	},*/

	ROA: Number,
	ROE: Number,
	ROS: Number,
	PE: Number,
	PB: Number,
	PS: Number,
	DE: Number,

});

mongoose.model("Company", CompanyScheme);