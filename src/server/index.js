/**
 * Server Entry File
 */

import express from 'express'
import engine from 'engine.io';
var fs = require('fs');
var foulWords = [];
var clients = {};

try {
    var data = fs.readFileSync('./static/list.txt', 'utf8');
    foulWords = data.split(',');
} catch (e) {
    console.log('Error:', e.stack);
}
process.chdir(__dirname)

var server = express()
    .use(express.static('./static'))
    .use(express.static('../static'))
    .get('*', (req, res) => {
        res.type('html').end(template('Hello'))
    })
    .listen(8888, () => console.log('App is listening on http://localhost:8888/'));

var io = engine.attach(server);
var time;
// connect event of the socket
io.on('connection', function (socket) {
    console.log('a user connected');
    clients[socket.id] = {id: socket.id};
    time = new Date();
    //sends a message to all connected clients that a user has joined.
    sendMessageToAll(socket, {
        msg: {
            message: 'A new user joined',
            type: 'new_user',
            id: 'Admin'
        },
        clientInfo: {},
        messageId: 'admin_msg',
        timestamp: time.getHours() + ":" + time.getMinutes()
    });

    // message event of the socket
    socket.on('message', function (data) {
        data = JSON.parse(data);
        time = new Date();
        var msg = data.message;
        //Deleting message from chatHistory if the user tries to delete a message.
        if (data.msgType == 'delete') {
            deleteFromChatHistory(data);
            notifyDeleteToClients(data);
        } else if (data.msgType == "edit") {
            // editing message from chatHistory if the user tries to edit a message.
            if (checkFoulWords(msg)) {
                socket.send(JSON.stringify({
                    msgType: 'rejected'
                }));
            } else {
                editMessage(socket, data);
            }
        } else {
            if (checkFoulWords(msg)) {
                var rejectedMsg = {
                    msgType: 'rejected'
                };
                socket.send(JSON.stringify(rejectedMsg));
            } else {
                var messageId = addToChatHistory(socket, data);
                sendMessageToAll(socket, {
                        msg: data,
                        clientInfo: {},
                        messageId: messageId,
                        timestamp: time.getHours() + ":" + time.getMinutes()
                    }
                );
            }
        }
    });
    // close event of the socket
    socket.on('close', function () {
        console.log('a user disconnected');
    });
});

//Checks foul words from list.txt.
function checkFoulWords(msg) {
    var result = false;
    for (var i = 0; i < foulWords.length; i++) {
        if (msg.indexOf(foulWords[i]) != -1) {
            result = true;
            break;
        }
    }
    return result;
}

// edits the message of the client.
function editMessage(socket, data){
    clients[data.clientId][data.msgId] = data.message;
    sendMessageToAll(socket, {
        msg: data,
        clientInfo: {},
        messageId: data.msgId,
        timestamp: time.getHours() + ":" + time.getMinutes()
    });
}

// deletes the chat history of the clients who are connected to server.
function deleteFromChatHistory(data) {
    delete clients[data.clientId][data.msgId];
}

//Notifies the client to delete message
function notifyDeleteToClients(data) {
    emit(data);
}

// adds the chat history of the clients who are connected to server.
function addToChatHistory(socket, packet) {
    var messageID = Object.keys(clients[socket.id]).length + 1;
    messageID = "MSG_" + messageID;
    clients[socket.id][messageID] = packet.message;
    return messageID;
}

//Adds id of the client and broadcasts the message
var sendMessageToAll = function (client, packet) {
    packet.clientInfo.sentBy = client.id;
    emit(packet);

};

// Sends the message to all clients connected to server.
var emit = function (packet) {
    for (var clientId in io.clients) {
        if (io.clients.hasOwnProperty(clientId)) {
            io.clients[clientId].send(JSON.stringify(packet));
        }
    }
};


function template(body) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>etv</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/normalize.css" rel="stylesheet">
    <link href="/styles.css" rel="stylesheet">
    <script src="/engine.io.js"></script>
</head>
<body>
</body>
    <div id='app'>${body}</div>
    <script src="/client.js"></script>
</html>
`
}
