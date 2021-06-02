const router = require('express').Router();
const auth = require('../../config/expressJwt');

const login = require('../../controllers/login');
const registration = require('../../controllers/registration');
//const getUser = require('../../controllers/getUser');
const getAllCompany = require('../../controllers/getAllCompany');
const getSingleCompany = require('../../controllers/getSingleCompany');



router.post('/regist', auth.optional, registration);

router.post('/login', auth.optional, login);

// router.get('/id', auth.required, getUser);

router.get('/company', auth.optional, getAllCompany);

// router.get('/company/:query', auth.required, getSingleCompany);
 router.get('/company/:query', auth.optional, getSingleCompany);

module.exports = router;
