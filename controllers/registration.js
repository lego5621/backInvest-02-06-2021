const mongoose = require('mongoose');
const Users = mongoose.model('Users');


module.exports = async function registration (req, res, next){
  const { body } = req;

  if(!body.email) {
	return res.status(422).json({
	  errors: {
		email: 'is required',
	  },
	});
  }

  if(!body.password) {
	return res.status(422).json({
	  errors: {
		password: 'is required',
	  },
	});
  }

  const finalUser = new Users(body);

  finalUser.setPassword(body.password);

  return finalUser.save()
	.then(() => res.json({ user: finalUser.toAuthJSON() }));
}