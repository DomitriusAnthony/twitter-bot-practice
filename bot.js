const twit = require('twit');
const config = require('./config')

const Twitter = new twit(config);

// Find the latest tweet accoring to the query(q) in params

const retweet = function() {
    const params = {
        q: '#nodejs, #Nodejs',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, (err, data) => {
        // if there are no errors
        if (!err) {
            // grab the ID of the tweet to retweet
            var retweetedId = data.statuses(0).id_str;
            // Tell Twitter to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            },function(err, response) {
                if (response) {
                    console.log("Retweeted your tweet bro")
                }

                if (err) {
                    console.log('Something went wrong with your retweet my dude');
                }
            });
        }

        else {
            console.log('Something went wrong while searching');
        }
    })
};

