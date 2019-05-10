import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessagesList extends Component {
    render() {
        const retHTML = this.props.messages.map(msg => msg.type == 'incomingMessage' ? <Message message={msg} key={msg.id} /> : <Notification message={msg} /> );

        return (
            <div className="messages">
                {retHTML}
            </div>
        );
    }
}
export default MessagesList;
