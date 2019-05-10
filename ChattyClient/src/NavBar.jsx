import React, { Component } from 'react';

//Display top navbar and logo component
class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div>{this.props.userCountMsg}</div>
            </nav>
        );
    }
}

export default NavBar;