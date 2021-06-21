const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = async function getUser (req, res, next){
    console.log(req.payload)
    const { payload: { id } } = req;
  
    return Users.findById(id)
        .then((user) => {
                if(!user) {
                return res.sendStatus(400);
            }
    
        return res.json({ id: user.id, firstname: user.firstname, lastname: user.lastname });
    });
}