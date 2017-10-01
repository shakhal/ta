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

  if (req.query.action == 'next') {
        queryAdditions = {
            max_id: bigInt(req.query.id).minus(1).toString()
        }
  }

  var query = Object.assign({"result_type":"recent", "q": req.query.q, "count": 20}, queryAdditions);

  client.get('search/tweets', query, function(error, result){
    if (error){
        res.status(500);
        res.send(error);
        console.error(error);
        return;
    }
    res.json(result.statuses.map(function (status) {
        var res =_.pick(status, 'text', 'user.name','user.screen_name', 'user.profile_image_url', 'created_at', 'id_str');
        res.user.profile_image_url = res.user.profile_image_url.replace("normal.jpg", "bigger.jpg");
        return res;
    }));
  });
});

module.exports = router;
