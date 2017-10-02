const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter.js');


router.get('/',(req, res) => {
    twitterService.query(req.query.q, req.query.action, req.query.id)
    .then(function(queryResult){
        res.json(queryResult);
    })
    .catch(function(error) {
        res.status(500);
        res.send(error);
        console.error(error);
        return;
    })
});

module.exports = router;
