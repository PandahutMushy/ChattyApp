import React, { Component } from 'react';

class Notification extends Component {
    render() {
        console.log(this.props.message);
        return (
            <div className="notification">
                <span className="notification-content">{this.props.message.message}</span>
            </div>
        );
    }
}

export default Notification;