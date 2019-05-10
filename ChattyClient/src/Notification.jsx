import React, { Component } from 'react';

//Display user status notification
class Notification extends Component {
    render() {
        return (
            <div className="notification">
                <span className="notification-content">{this.props.message.message}</span>
            </div>
        );
    }
}

export default Notification;