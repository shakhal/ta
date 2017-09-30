import React, { Component } from 'react';
import Tweet from '../Tweet/Tweet.js';
import './Tweets.css';
class Tweets extends Component {

    render() {
        return (
            <div>
                <ul className="App-tweets-list">
                    {
                        this.props.tweets.map(function (tweet) {
                        return (
                                <li className="App-tweets-list-item" key={tweet.id_str}>
                                    <Tweet tweet={tweet}  />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Tweets;
