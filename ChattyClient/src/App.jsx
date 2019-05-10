import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import ChatBar from './ChatBar.jsx';

//Main app component - Handles entire app state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      loading: true,
      messages: [], // Messages coming from the server will be stored here as they arrive
      usrCountTxt: ''
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

  //DOM is ready, add listener for received data from node server
  componentDidMount() {
    this.webSocket = new WebSocket('ws://localhost:3001');

    this.webSocket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);

      switch (receivedData.type) {
        case 'incomingMessage': {
          const allMessages = this.state.messages.concat(receivedData);
          this.setState({ messages: allMessages, loading: false }); // Triggers a re-render
          break;
        }
        case 'incomingNotification': {
          const allMessages = this.state.messages.concat(receivedData);
          this.setState({ messages: allMessages, loading: false }); // Triggers a re-render
          break;
        }
        case 'incomingUserCount': {
          const usrCountTxt = receivedData.usercountmsg;
          this.setState({ usrCountTxt: usrCountTxt }); // Triggers a re-render
          break;
        }

        default:
          // Show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + receivedData);
      }
    }
  }

  //Send user input / message to Node server
  addNewMessage(msgObj) {
    const jsonMsg = JSON.stringify(msgObj);
    this.webSocket.send(jsonMsg);
  }

  //Send user notification status to Node server
  addNewNotification(notificationObj) {
    this.setState({ currentUser: { name: notificationObj.userChange.newName } });
    const jsonNotification = JSON.stringify(notificationObj);
    this.webSocket.send(jsonNotification);
  }

  //Update app state
  render() {
    const mainEl = (!this.state.loading) ? <Main messages={this.state.messages} /> : '';

    return (
      <div>
        <NavBar userCountMsg={this.state.usrCountTxt} />
        {mainEl}
        <ChatBar username={this.state.currentUser.name} sendChatMessage={this.addNewMessage} sendNotification={this.addNewNotification} setUserName={this.setUserName} />
      </div>
    );
  }
}

export default App;
// optional. if currentUser is not defined, it means the user is Anonymous// optional. if currentUser is not defined, it means the user is Anonymous