import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Tweets from './Tweets/Tweets';
import ApiResponse from './dummy_api.json';
import { shallow, mount } from 'enzyme'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

beforeEach(function() {

    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: function() {
                    return ApiResponse
                }
            });
        });
        return p;
    });

});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  console.log(div.innerHTML);
});

it('renders header', () => {
    const app = shallow(<App />);
    expect(app.find('header')).toHaveHTML('<header class="App-header">' +
        '<img src="twitter.png" class="App-logo" alt="logo"/>' +
        '<h1 class="App-title">Tweets</h1></header>');
});

it('renders', () => {
    const app = mount(<App />);
    // expect(app).toContainReact(<Tweets/>)
    // const tweets = mount(<Tweets tweets={[{text:"123",id_str:"123",user:{profile_image_url:"http://123"}}]} />);
    // expect(app).toHaveHTML('<header class="App-header">' +
    //     '<img src="twitter.png" class="App-logo" alt="logo"/>' +
    //     '<h1 class="App-title">Tweets</h1></header>');
});
