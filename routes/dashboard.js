const express = require('express');
const api = require('../api');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('dashboard')
});

router.post('/', function (req, res) {
    api.getUser(req.body.name, req.body.address)
        .then(({ result, isError }) => {
            if(isError)
                res.sendStatus(400)
            res.send(result)
        })
})

module.exports = router;
