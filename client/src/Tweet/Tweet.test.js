import React from 'react';
import { mount, shallow } from 'enzyme'
import Tweet from "./Tweet";

describe('Tweet', function(){

    const tweet =
        {
            text: 'Broccolini',
            id_str: '100',
            user: {
                name:"name1",
                screen_name:"sname1",
                profile_image_url:"http://name1/img1"
            }
        };

    it('renders without crashing', () => {
        expect(mount(<Tweet tweet={tweet}/>).find('.App-tweet-avatar img').getDOMNode().getAttribute('src')).toEqual(tweet.user.profile_image_url);
        expect(mount(<Tweet tweet={tweet}/>).find('.App-tweet-name').getDOMNode().innerHTML).toEqual(tweet.user.name);
        expect(mount(<Tweet tweet={tweet}/>).find('.App-tweet-handle').getDOMNode().innerHTML).toEqual("@"+tweet.user.screen_name);
        expect(mount(<Tweet tweet={tweet}/>).find('.App-tweet-text').getDOMNode().innerHTML).toEqual(tweet.text);
    });


});
