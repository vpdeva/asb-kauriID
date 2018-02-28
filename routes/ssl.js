const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/:filename', function(req, res){
    var filename = "uKwhiBlhwej7GSoy_n0evLDWKfVEqHXnM24gUElhsfE";
    console.log("test nw", path.join(__dirname, '../public'));
    res.sendFile(path.join(__dirname, '../public') + '/' + filename);
});

module.exports = router;
