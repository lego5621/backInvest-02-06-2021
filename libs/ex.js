const yahooFinance = require('yahoo-finance2').default;

async function a(tik){
	const queryOptions = { period1: '2021-05-08',};
	const result = await yahooFinance._chart(tik, queryOptions);
	console.log(result)
}

a('AAPl')
