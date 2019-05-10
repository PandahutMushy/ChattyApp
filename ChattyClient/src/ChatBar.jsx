import React, { Component } from 'react';

class ChatBar extends Component {
    _keyPressedMessage = e => {
         if (e.key === 'Enter') {
             const newMessage = { type: 'postMessage', username: this.props.username, content: e.target.value };
             this.props.sendChatMessage(newMessage);
             e.target.value = "";
         }
    }
    _keyPressedUserName = e => {
        if (e.key === 'Enter') {
            const userChange = { newName: e.target.value, oldName: this.props.username};
            const userName = { type: 'postNotification', userChange };
            // const notificationMsg = this.props.username + ' has changed their name to ' + e.target.value;
            // const userName = { type: 'postNotification', message: notificationMsg };
            this.props.sendNotification(userName);
        }
    }
    render() {
        const userName = this.props.username;

        return (
            <footer className="chatbar">
                <input className="chatbar-username"
                    onKeyDown={this._keyPressedUserName}
                    defaultValue={userName}
                    placeholder="Type your username!" />

                <input className="chatbar-message"
                    onKeyDown={this._keyPressedMessage}
                    placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

export default ChatBar;