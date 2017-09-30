import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
    next = () => {
        this.props.next(this.props.page + 1);
    }

    render() {
        return (
            <div>
                <div className="App-ctrls-prev">Prev</div>
                <div className="App-ctrls-next" onClick={this.props.next}>Next</div>
            </div>
        );
    }

}

export default Controls ;
