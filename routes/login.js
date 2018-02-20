const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('login');
});

router.get('/lte', function(req, res){
    res.render('lte');
});

module.exports = router;
