import React, { Component } from 'react';
import './App.css';
import Tweets from './Tweets/Tweets.js'
import logo from './twitter.png';
import Controls from "./Controls/Controls";

class App extends Component {

    constructor(){
        super();
        this.state = {
            tweets: [],
            page: 0,
            query: '%23trump',
            pages: {}
        };
    };

    loadTweets(action){
        var controlQuery = "";

        if (action && action === 'next') {
            controlQuery = "&action=next&id="+this.state.tweets[this.state.tweets.length - 1].id_str;
        }

        if (action && action === 'prev') {
            controlQuery = "&action=prev&id="+this.state.tweets[0].id_str;
        }

        return fetch("/api?q="+ this.state.query + controlQuery)
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                if (json.length > 0) {
                    this.setState({tweets: json});

                    var cache = this.state.pages;
                    cache[this.state.page] = this.state.tweets;
                    this.setState({pages: cache});

                }
                else {
                    alert("No tweets found!");
                }
            });
    };

    next = () => {
        var page = this.state.page;

        if (this.state.pages[this.state.page + 1] && this.state.pages[this.state.page + 1].length > 0) {
            this.setState({tweets: this.state.pages[this.state.page + 1]});
            this.setState({page: page + 1});
            return Promise.resolve();
        }

        this.loadTweets('next')
        .then(() => {
            this.setState({page: page + 1});
            //eslint-disable-next-line
            scrollTo(0,0);
        });
    };

    prev = () => {
        var self = this;
        if (this.state.pages[this.state.page - 1] && this.state.pages[this.state.page - 1].length > 0) {
            this.setState({tweets: this.state.pages[this.state.page - 1]});
            self.setState({page: page - 1});
            return Promise.resolve();
        }
        var page = this.state.page;
        this.loadTweets('prev')
        .then(function () {
            self.setState({page: page - 1});
            //eslint-disable-next-line
            scrollTo(0,0);
        });
    };

    componentDidMount() {
        this.loadTweets();
    };


    render() {
        return (
          <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Tweets</h1>
            </header>
            <div className="App-tweets">
                <Tweets tweets={this.state.tweets}></Tweets>
                {
                    <a onClick={() => this.next()} className="App-control-next">Next{">>"}</a>
                }
                {   this.state.page > 0 &&
                    <a onClick={() => this.prev()} className="App-control-prev">{"<<"}Prev</a>
                }
                {/*<Controls next={this.next} page={this.state.page}/>*/}
            </div>
          </div>
        );
    }
}

export default App;
