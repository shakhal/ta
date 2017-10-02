const Twitter = require('twitter');
const _ = require('lodash');
const bigInt = require("big-integer");
const config = require('../config.json');
const QUERY_RESULT_SIZE = 20;

const client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    bearer_token: config.bearer_token
});

function query(term, action, id) {
    var queryAdditions= {};

    if (action == 'before') {
        queryAdditions = {
            max_id: bigInt(id).minus(1).toString()
        }
    }

    var query = Object.assign({"result_type":"recent", "q": term, "count": QUERY_RESULT_SIZE}, queryAdditions);

    return client.get('search/tweets', query)
    .then(function(result){
        return result.statuses.map(function (status) {
            var res =_.pick(status, 'text', 'user.name','user.screen_name', 'user.profile_image_url', 'created_at', 'id_str');
            res.user.profile_image_url = res.user.profile_image_url.replace("normal.jpg", "bigger.jpg");
            return res;
        });
    });
}


module.exports.query = query;