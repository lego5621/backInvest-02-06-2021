const router = require('express').Router();
const auth = require('../../config/expressJwt');

const login = require('../../controllers/login');
const registration = require('../../controllers/registration');
//const getUser = require('../../controllers/getUser');
const getAllCompany = require('../../controllers/getAllCompany');
const getSingleCompany = require('../../controllers/getSingleCompany');
const search = require('../../controllers/search');





router.post('/regist', auth.optional, registration);

router.post('/login', auth.optional, login);

router.get('/company', auth.required, getAllCompany);

router.get('/company/:query', auth.required, getSingleCompany);

router.get('/search', auth.optional, search);

module.exports = router;
