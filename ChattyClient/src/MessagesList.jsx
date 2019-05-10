import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

//Display list of messages
class MessagesList extends Component {
    render() {
        const retHTML = this.props.messages.map(msg => msg.type == 'incomingMessage' ? <Message message={msg} key={msg.id} /> : <Notification message={msg} key={msg.id} /> );

        return (
            <div className="messages">
                {retHTML}
            </div>
        );
    }
}
export default MessagesList;
