const twit = require('twit');
const config = require('./config')

const Twitter = new twit(config);

// RETWEET BOT


const retweet = function() {
    // Find the latest tweet accoring to the query(q) in params
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

setInterval(retweet, 3000000);


// FAVORITE BOT

// Find a random tweet and 'favorite' it 
var favoriteTweet = function() {
    var params = {
        q: "#nodejs, #Nodsjs",
        result_type: "recent",
        land: "en"
    }

    Twitter.get('search/tweets', params, (err, data) =>{
        // find tweets
        var tweet = data.statuses;
        var randomTweet = randomTweet(tweet) // This picks a random tweet

        // if the random tweet exists
        if (typeof randomTweet != 'undefined') {
            // Tell Twitter to 'favorite'
            Twitter.post('favorites/create', {id: randomTweet.id_str}, (err, response) => {
                // if there was an error while trying to favorite
                if(err) {
                    console.log('Cannot favorite this bad boy');
                } else {
                    console.log('Success!')
                }
            })
        }
    })
}

// Favorites a tweet every 60 minutes
setInterval(favoriteTweet, 3600000);


