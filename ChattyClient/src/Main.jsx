import React, { Component } from 'react';
import MessagesList from './MessagesList.jsx';

class Main extends Component {
    render() {
        return (
            <MessagesList messages={this.props.messages} />
            //(this.props.notification)
        );
    }
}

export default Main;