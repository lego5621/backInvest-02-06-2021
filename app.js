const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');

const history = require('connect-history-api-fallback');

require('dotenv').config();


//Initiate our app
const app = express();

app.use(history());

// app.use(require('morgan')('dev'));


//Configure our app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: 'passportForSecretSite31', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(process.env.PRODUCTION) {
  app.use(errorHandler());
}

//Configure Mongoose
require('./config/mongoose.js');

// Model 
require('./models/registrationModel');

//Config
// require('./config/passport');

// Routes

app.use(express.static('dist_front'));
app.use(require('./routes'));


//Error handlers & middlewares
// if(!process.env.PRODUCTION) {
//   app.use((err, req, res, next) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
    },
  });
});

app.use(function(req, res, next) {
	res.status(404).json({
		error: 'Page not found',
	})
});


app.listen(process.env.PORT,() => {
  console.log(`Running on PORT ${process.env.PORT}`);
})
