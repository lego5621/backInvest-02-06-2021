const mongoose = require('mongoose');
mongoose.promise = global.Promise;


mongoose.connect(process.env.DB_URL ,{ useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('debug', 1);

