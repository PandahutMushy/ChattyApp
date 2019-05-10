import React, { Component } from 'react';
import MessagesList from './MessagesList.jsx';

//Display our app content
class Main extends Component {
    render() {
        return (
            <MessagesList messages={this.props.messages} />
        );
    }
}

export default Main;