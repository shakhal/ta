const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const _ = require('lodash');
const bigInt = require("big-integer");
const config = require('../config.json');

var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  bearer_token: config.bearer_token
});


router.get('/', (req, res) => {
  var queryAdditions= {};
    console.log(req.query.id)
    console.log(bigInt(req.query.id).minus(1).toString())
  if (req.query.action == 'next') {
        queryAdditions = {
            max_id: bigInt(req.query.id).minus(1).toString()
        }
  }
  else if (req.query.action == 'prev') {
        queryAdditions = {
            since_id: bigInt(req.query.id).plus(1)
        }
  }

  var query = Object.assign({"result_type":"recent", "q": req.query.q, "count": 20}, queryAdditions);
console.log(query)
  client.get('search/tweets', query, function(error, result){
    if (error){
        res.status(500);
        res.send(error);
        console.error(error);
        return;
    }
    res.json(result.statuses.map(function (status) {
        return _.pick(status, 'text', 'user.name','user.screen_name', 'user.profile_image_url', 'created_at', 'id_str');
    }));
  });
});

module.exports = router;
