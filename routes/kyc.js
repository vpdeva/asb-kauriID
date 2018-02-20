const express = require('express');
const { addKyc, getKyc } = require('../api');
const router = express.Router();

router.get('/', function(req, res){
    res.render('kyc');
});

router.post('/', function(req, res) {
    let status = addKyc(req.body.name, req.body.address, req.body.kyc);
    if(status){
        let kyc = getKyc(req.params.address);
        res.send({ details: kyc, status: 200 })
    }else{
        res.sendStatus(400);
    }
})

router.get('/details', function(req,res) {
    let kyc = getKyc(req.params.address);
    if(kyc)
        res.send({ details: kyc, status: 200 })
    else
        res.send(null);
});

module.exports = router;
