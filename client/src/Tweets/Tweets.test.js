import React from 'react';
import { shallow } from 'enzyme'
import Tweets from "./Tweets";

describe('Tweets', function(){

    const tweets = [
        {
            text: 'Broccolini',
            id_str: '100',
            user: {
                name:"name1",
                screen_name:"sname1",
                profile_image_url:"http://name1/img1"
            }
        },
        {
            text: 'Broccoli rabe',
            id_str: '200',
            user: {
                name:"name2",
                screen_name:"sname2",
                profile_image_url:"http://name2/img2"
            }
        },
    ];

    it('renders without crashing', () => {
        expect(shallow(<Tweets tweets={[]}/>).contains(<ul className="App-tweets-list"></ul>)).toBe(true);
    });

    it('renders tweets', () => {
        expect(shallow(<Tweets tweets={tweets}/>).find('li').length).toBe(2);
    });

});
