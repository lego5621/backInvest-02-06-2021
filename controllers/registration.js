const mongoose = require('mongoose');
const Users = mongoose.model('Users');


module.exports = async function registration (req, res, next){
  const { body } = req;

  console.log(body)

  if(!body.email || body.email.trim() == '') {
	return res.status(422).json({
	  errors: {
		email: 'is required',
	  },
	});
  }

  if(!body.password || body.password.trim() == '') {
	return res.status(422).json({
	  errors: {
		password: 'is required',
	  },
	});
  }

  if(!body.firstname || body.firstname.trim() == '') {
	return res.status(422).json({
	  errors: {
		password: 'is required',
	  },
	});
  }

  if(!body.lastname || body.lastname.trim() == '') {
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