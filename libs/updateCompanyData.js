const mongoose = require("mongoose");
require("../models/Company");
const Company = mongoose.model("Company");
const yahooFinance = require("yahoo-finance2");
const moment = require("moment");
const translatte = require("translatte");
require("dotenv").config();

mongoose.promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

async function app() {
	let allCompany = await Company.find({ showCompany: true });
	let d = new Date(Date.now() - 86400000);

	d = d.toJSON().split("T")[0];

	console.log(d);

	allCompany.forEach(async (i) => {
		let company = await Company.findOne({ ticker: i.ticker }, function (err) {
			if (err) return console.log(err);
		});

		const queryOptions = { period1: d };

		let price = await yahooFinance.default.historical(i.ticker, queryOptions);

		let statement = await yahooFinance.default.quoteSummary(
			i.ticker,
			{
				modules: [
					"earnings",
					"balanceSheetHistory",
					"cashflowStatementHistory",
					"earningsTrend",
					"assetProfile",
					"earningsHistory",
					"upgradeDowngradeHistory",
					"financialData",
					"summaryDetail",
					"recommendationTrend",
				],
			},
			{ validateResult: false }
		);

		let quote = await yahooFinance.default.quote(i.ticker, {
			fields: [
				"marketCap",
				"regularMarketPrice",
				"priceToBook",
				"epsCurrentYear",
				"forwardPE",
			],
		});

		company.historicalPrice.push({
			date: price[0].date,
			adjClose: price[0].adjClose,
			adjTargetPrice: statement.financialData.targetMeanPrice
				? statement.financialData.targetMeanPrice
				: price[0].adjClose,
		});

		company.recommendationPrice =
			statement.financialData.targetMeanPrice || quote.regularMarketPrice;
		company.currentPrice = quote.regularMarketPrice;

		company.profitPercentage =
			Math.floor(
				((statement.financialData.targetMeanPrice - price[0].adjClose) /
					statement.financialData.targetMeanPrice) *
					100
			) || 0;

		company.statementAll = getStatement(statement);
		company.statementPrognosis = getStatementPrognosis(quote, statement);
		company.recommendationTrend = getRecommendationTrend(statement);
		company.analystsGrade = getGrade(statement);
		company.dividendsPaid = await getDividendYear(company.ticker);
		company.debtRatio = getDebtRatio(statement);
		company.recommendation = getRecommendation(statement);
		company.minRecommendation = statement.financialData.targetLowPrice;
		company.maxRecommendation = statement.financialData.targetHighPrice;
		company.website = statement.assetProfile.website;
		company.recommendationAnalCaunt = getRecommendationCaunt(statement);

		if (company.fullDescription == "") {
			await translatte(statement.assetProfile.longBusinessSummary, { to: "ru" })
				.then((res) => {
					return (company.fullDescription = res.text);
				})
				.catch((err) => {
					console.log(`${nameCompany} перевод не добавлен`);
				});
		}

		// console.dir(company, {'maxArrayLength': null});
		//company.overallRisk = recommendationTrend.assetProfile.overallRisk

		company.save(function (err) {
			// mongoose.disconnect();
			if (err) return console.log(err);
			console.log(`Обновлена ${company.ticker}`);
		});
	});
}

app();

function getRecommendationTrend(recommendationTrend) {
	let result = [];

	for (let i of recommendationTrend.recommendationTrend.trend) {
		result.push({
			period: i.period,
			strongBuy: i.strongBuy,
			buy: i.buy,
			hold: i.hold,
			sell: i.sell + i.strongSell,
		});
	}

	return result;
}

// выручка чп
function getStatement(statement) {
	let setStatement = [];

	statement.earnings.financialsChart.yearly.forEach(function (item, i, arr) {
		setStatement.push({
			year: item.date,
			revenue: item.revenue,
			earnings: item.earnings,
		});
	});
	return setStatement;
}

// Долг к активам
function getDebtRatio(result) {
	let TotalDebtRatio = [];

	result.balanceSheetHistory.balanceSheetStatements.forEach(function (
		item,
		i,
		arr
	) {
		TotalDebtRatio.push({
			year: item.endDate.getFullYear(),
			percent: Math.round((item.totalLiab / item.totalAssets) * 100),
		});
	});
	return TotalDebtRatio;
}

function getStatementPrognosis(result, statement) {
	let earnings1 = Math.round(
		(result.marketCap / result.regularMarketPrice) *
			statement.earningsTrend.trend[2].earningsEstimate.avg
	);
	let earnings2 = Math.round(
		(result.marketCap / result.regularMarketPrice) *
			statement.earningsTrend.trend[3].earningsEstimate.avg
	);

	let erning = [
		{
			year: statement.earningsTrend.trend[2].endDate
				? statement.earningsTrend.trend[2].endDate.getFullYear()
				: null,
			revenue: statement.earningsTrend.trend[2].revenueEstimate.avg,
			earnings: earnings1,
		},
		{
			year: statement.earningsTrend.trend[3].endDate
				? statement.earningsTrend.trend[3].endDate.getFullYear()
				: null,
			revenue: statement.earningsTrend.trend[3].revenueEstimate.avg,
			earnings: earnings2,
		},
	];

	return erning;
}

async function getDividendYear(ticker) {
	try {
		const OptionsDividendHistory = {
			period1: "2010-01-01",
			events: "dividends",
		};
		const quote = await yahooFinance.default.historical(
			ticker,
			OptionsDividendHistory,
			{ validateResult: false }
		);

		let a = quote.sort(function (a, b) {
			return new Date(b.date) - new Date(a.date);
		});

		function divFun(a, Year) {
			let arr = [];
			for (let value of a) {
				if (value.date.getFullYear() == Year) {
					arr.push(value);
				}
			}

			let sum = { year: Year, percent: 0 };

			for (let i of arr) {
				sum.percent = sum.percent + i.dividends;
			}

			sum.percent = sum.percent.toFixed(2);

			return sum;
		}

		let arrDev = [
			divFun(a, new Date().getFullYear() - 1),
			divFun(a, new Date().getFullYear() - 2),
			divFun(a, new Date().getFullYear() - 3),
			divFun(a, new Date().getFullYear() - 4),
			divFun(a, new Date().getFullYear() - 5),
			divFun(a, new Date().getFullYear() - 6),
			divFun(a, new Date().getFullYear() - 7),
			divFun(a, new Date().getFullYear() - 8),
			divFun(a, new Date().getFullYear() - 9),
			divFun(a, new Date().getFullYear() - 10),
		];

		return arrDev;
	} catch (err) {
		console.log(`Дивиденды не добавлены ${ticker}`);
		return (arrDev = []);
	}
}

function getGrade(result) {
	let arr = [];

	for (let i of result.upgradeDowngradeHistory.history) {
		arr.push({
			date: moment(i.epochGradeDate).locale("ru").format("L"),
			toGrade: i.toGrade,
			firm: i.firm,
			text: false,
		});
		if (arr.length == 20) break;
	}

	return arr;
}

function getRecommendation(recommendationTrend) {
	let a = recommendationTrend.recommendationTrend.trend[0];
	if (
		a.strongBuy + a.buy > a.hold &&
		a.strongBuy + a.buy > a.sell + a.strongSell
	) {
		return "Покупать";
	} else if (a.strongBuy + a.buy <= a.hold && a.sell + a.strongSell <= a.hold) {
		return "Держать";
	} else {
		return "Продавать";
	}
}

function getRecommendationCaunt(recommendationTrend) {
	let a = recommendationTrend.recommendationTrend.trend[0];
	return a.buy + a.hold + a.strongBuy + a.buy + a.sell + a.strongSell;
}
