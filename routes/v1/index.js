const router = require('express').Router();
// const auth = require('../../config/expressJwt');

const login = require('../../controllers/login');
const registration = require('../../controllers/registration');
//const getUser = require('../../controllers/getUser');
const getAllCompany = require('../../controllers/getAllCompany');
const getSingleCompany = require('../../controllers/getSingleCompany');
const search = require('../../controllers/search');



router.post('/regist', registration);


router.post('/login', login);

router.get('/company', getAllCompany);
// router.get('/company', auth.required, getAllCompany);


router.get('/company/:query', getSingleCompany);

router.get('/search', search);


module.exports = router;
