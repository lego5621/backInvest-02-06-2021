const app = require("../libs/NewAddNewCompany.js");

const mongoose = require("mongoose");
require("../models/Company");
require("dotenv").config();


mongoose.promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

let a = [
	{
		ticker: "OKE",
		description:
			"Oneok, Inc. - американская диверсифицированная корпорация, специализирующаяся в первую очередь на газовой промышленности, со штаб-квартирой в Талсе, штат Оклахома. Компания входит в списки Fortune 500 и S&P 500.",
		avatar: "https://s3-symbol-logo.tradingview.com/oneok--600.png",
	},
];

a.forEach(async (i) => {
	await app(i);
});
