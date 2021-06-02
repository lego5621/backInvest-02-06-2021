const mongoose = require('mongoose');
require('../models/Company');
const Company = mongoose.model('Company');
const yahooFinance = require('yahoo-finance2');

mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// import pkg from 'mongodb';
// const { MongoClient } = pkg;


async function app(){

	function setPrice(price){
		let historicalPrice = [];
		price.forEach(function(item, i, arr) {
			historicalPrice.push(
				{
					date: item.date,
					adjClose: item.adjClose,
					adjTargetPrice: item.adjClose,
				}
			)
		});

		return historicalPrice
	}

	let d = new Date();
	d =  new Date(d.setMonth(d.getMonth() - 18))
	d= d.toJSON().split("T")[0]
	
	
	console.log('Начало котировок с ',d)
	
	
	const ticker = 'f';
	const description = "Ford (по-русски — Форд, полностью Ford Motor Company) — американская автомобилестроительная компания, производитель автомобилей под маркой Ford. Четвёртый в мире производитель автомобилей по объёму выпуска за весь период существования."
	const avatar = "https://i.pinimg.com/originals/ef/42/ca/ef42ca1f54cdc260a082a35d7943725d.png"
	const queryOptions = { period1: d};

	const price = await yahooFinance.default.historical(ticker,  queryOptions);
	const quote = await yahooFinance.default.quote(ticker);
	
	let nameCompany= quote.displayName;
	
	if(!quote.displayName){
		nameCompany= quote.shortName
	}

	const allCompany = new Company({
		name: nameCompany,
		avatar: avatar,
		description: description,
		ticker: ticker.toLowerCase(),
		historicalPrice: setPrice(price),
	});

	allCompany.save(function(err){
		mongoose.disconnect(); 
		if(err) return console.log(err);
		console.log("Сохранен объект");
	});
}

app()
