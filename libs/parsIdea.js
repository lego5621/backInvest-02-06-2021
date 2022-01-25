const requestPromise = require('request-promise');
require('../models/Idea');
const mongoose = require('mongoose');
const Idea = mongoose.model('Idea');

var start = 160;
var arrUrl = [];
while (start >= 0) {
  arrUrl.push(start--);
}


mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

Idea.deleteMany({}, function(err) { 
  if(err) console.log(err)
  console.log('База идей очищена') 
});

for(let page of arrUrl){
  requestPromise(`https://invest-idei.ru/api/ideas/filter?asset=all&iis=0&currency=&growth_factors=&status=any&hot=0&potential_yield=0,101&horizon=0,27&risk=0&broker_id=&stat=0&licenced=0&sort_by=date_start&sort_order=desc&period=all&page=${page}`,)
    .then(function(html){
      let a = JSON.parse(html)
      for(let i of a.data.ideas){
        if(i.date_exp !== ''){continue}
        if(i.tickers[0].ticker_ticker.includes('.')){continue}
        let a= {
          ticker: i.tickers[0].ticker_ticker.toLowerCase(),
          name : i.broker.name,
          logo: `https://invest-idei.ru${i.broker.logo}`,
          url: i.full_url,
          description: i.meta_description,
          recom: i.forecast.name,
          profitPros: i.real_yield_absolute,
          time: i.days_left_txt
        }

        let allIdea = new Idea(a);

        allIdea.save(function(err){
          // mongoose.disconnect(); 
          console.log('сохранен', a.ticker)
          if(err) return console.log(err.statusCode);
        });
      }

    })
    .catch(function(err){
      console.log(err)
    });
}