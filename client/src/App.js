import React, { Component } from 'react';
import './App.css';
import Tweets from './Tweets/Tweets.js'
import logo from './twitter.png';

class App extends Component {

    constructor(){
        super();
        this.state = {
            tweets: [],
            page: 0,
            query: '%23trump',
            pageCache: {}
        };
    };

    loadTweets(action){
        var controlQuery = "";

        if (action && action === 'next') {
            controlQuery = "&action=before&id="+this.state.tweets[this.state.tweets.length - 1].id_str;
        }

        return fetch("/api?q="+ this.state.query + controlQuery)
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                if (json.length > 0) {
                    this.setState({tweets: json});
                }
                else {
                    alert("No tweets found!");
                }
            });
    };

    next = () => {
        var page = this.state.page;

        if (this.state.pageCache[this.state.page + 1] && this.state.pageCache[this.state.page + 1].length > 0) {
            this.setState({tweets: this.state.pageCache[this.state.page + 1]});
            this.updatePage(page + 1);
            return;
        }
        else {
            this.loadTweets('next')
            .then(()=> {this.updatePage(page + 1)})
            .then(this.saveToCache);
        }
    };

    prev = () => {
        var page = this.state.page;
        this.setState({tweets: this.state.pageCache[page - 1]});
        this.updatePage(page - 1);
        return;
    };

    componentDidMount() {
        this.loadTweets()
        .then(this.saveToCache);
    };

    saveToCache = () => {
        var cache = this.state.pageCache;
        cache[this.state.page] = this.state.tweets;
        this.setState({pageCache: cache});
    };

    updatePage(pageNumber) {
        this.setState({page: pageNumber});
        //eslint-disable-next-line
        scrollTo(0,0);
    }

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
                    <a onClick={() => this.prev()} className="App-control-prev">{"<<"}Back</a>
                }
            </div>
          </div>
        );
    }
}

export default App;
