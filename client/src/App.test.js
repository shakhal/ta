import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'

beforeEach(function() {
    global.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: function() {
                    return []
                }
            });
        });
    });

});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders header', () => {
    const app = shallow(<App />);
    expect(app.find('header')).toHaveHTML('<header class="App-header">' +
        '<img src="twitter.png" class="App-logo" alt="logo"/>' +
        '<h1 class="App-title">Tweets</h1></header>');
});

it('test init', () => {
    const app = shallow(<App />);
    expect(app.state().pageCache).toEqual({});
    expect(app.state().page).toEqual(0);
    expect(app.state().tweets).toEqual([]);
});
