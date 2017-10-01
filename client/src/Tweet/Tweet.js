import React, { Component } from 'react';
import './Tweet.css';
import {formatDate} from '../Util/date'


class Tweet extends Component {
    render() {
        return (
            <div className="App-tweet-wrapper">
                <div className="App-tweet-avatar">
                    <img src={this.props.tweet.user.profile_image_url} alt="avatar" />
                </div>
                <div className="App-tweet-details">
                    <div className="App-tweet-details-header">
                        <div className="App-tweet-name">{this.props.tweet.user.name}</div>
                        <div className="App-tweet-handle">@{this.props.tweet.user.screen_name}</div>
                        <div className="App-tweet-date">{formatDate(this.props.tweet.created_at)}</div>
                    </div>
                    <div className="App-tweet-text">{this.props.tweet.text}</div>
                </div>
            </div>
        );
    }
}

export default Tweet;
