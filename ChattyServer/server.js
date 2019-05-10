// server.js
const WebSocket = require('ws');
const express = require('express');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// The ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    const size = wss.clients.size;
    const numUsersObj = { type: 'numUsersUpdate', numUsers: size };
    wss.broadcast(JSON.stringify(numUsersObj));

    ws.on('message', function incoming(data) {
        wss.broadcast(data);
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');
        const size = wss.clients.size;
        const numUsersObj = { type: 'numUsersUpdate', numUsers: size };
        wss.broadcast(JSON.stringify(numUsersObj));
    });
});

// Broadcast to all
wss.broadcast = function broadcast(data) {
    const parsedData = JSON.parse(data);

    switch (parsedData.type) {
        case 'postMessage':
            const newMessage = Object.assign(
                parsedData,
                {
                    id: uuidv1(),
                    type: 'incomingMessage',
                },
            );
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newMessage));
                }
            });
            break;

        case 'postNotification':
            const newNotification = {
                id: uuidv1(),
                type: 'incomingNotification',
                message: `${parsedData.userChange.oldName} has changed their name to ${parsedData.userChange.newName}!`
            };

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newNotification));
                }
            });
            break;

        case 'numUsersUpdate':
            const newUserCountObj = {
                id: uuidv1(),
                type: 'incomingUserCount',
                usercountmsg: 'Users Online: ' + parsedData.numUsers
            };

            let newUserStr = JSON.stringify(newUserCountObj);
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(newUserStr);
                }
            });
            break;
        default:
            console.log('An error has occurred while handling the data server-side!', data);
            break;
    }
};