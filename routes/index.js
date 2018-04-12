const express = require('express');

const plans = require('./plans');
const kycdetails = require('./kycdetails');
const ssl = require('./ssl');
const sign = require('./sign');
const creditscore = require('./creditscore');
const register = require('./register');


const dashboard = require('./dashboard');
const kyc = require('./kyc');
const login = require('./login');

const router = express.Router();

router.use('/', login);
router.use('/plans', plans);
router.use('/sign', sign);
router.use('/creditscore', creditscore);
router.use('/register', register);


router.use('/kyc', kycdetails);
router.use('/.well-known/acme-challenge', ssl);

module.exports = router;
