import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        const style = {
            fontWeight: 'bold',
            float: 'right',
            margin: '1.2rem'
        };
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div style={style}>{this.props.userCountMsg}</div>
            </nav>
        );
    }
}

export default NavBar;