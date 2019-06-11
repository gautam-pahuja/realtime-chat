import React from 'react'
import userName from './userName'
import chatRoom from './chatRoom'
var socket;
var messageSeparator = '##';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.registerSocketEvents = this.registerSocketEvents.bind(this);
        this.openSocket = this.openSocket.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.sendEdittedMessage = this.sendEdittedMessage.bind(this);

        this.state = {
            showChat: false,
            id: null,
            sockId: null,
            messageList: [],
            status: null
        };
    }

    changePage() {
        this.setState({
            showChat: true
        });
    }

    setStatus(status) {
        this.setState({
            status: status
        });
    }

    deleteMessage(idx) {
        this.setStatus("Deleting Message");
        var id = idx.split(messageSeparator);
        var deleteObj = {
            clientId: id[0],
            msgId: id[1],
            msgType: 'delete'
        };
        socket.send(JSON.stringify(deleteObj));
    }

    sendEdittedMessage(message, idx) {
        this.setStatus("Editing Message");
        var id = idx.split(messageSeparator);
        var editObj = {
            clientId: id[0],
            msgId: id[1],
            msgType: 'edit',
            message: message
        };
        socket.send(JSON.stringify(editObj));
    }

    registerSocketEvents() {
        var self = this;
        socket.on('open', function () {
            socket.on('message', function (data) {
                data = JSON.parse(data);
                if (data.msgType == 'rejected') {
                    self.setStatus("message contains foul words. Please try again");
                } else if (data.msgType == 'delete') {
                    var id = data.clientId + messageSeparator + data.msgId;
                    setTimeout(function () {
                        self.setStatus("");
                        document.getElementById(id).remove();
                    }, 500);
                } else if (data.msg.msgType == 'edit') {
                    for (var i = 0; i < self.state.messageList.length; i++) {
                        if (self.state.messageList[i].clientInfo.sentBy == data.clientInfo.sentBy && self.state.messageList[i].messageId == data.messageId) {
                            self.state.messageList[i].msg.message = data.msg.message;
                        }
                    }
                    setTimeout(function () {
                        self.setStatus("");
                    }, 500);
                } else {
                    self.setState({
                        messageList: self.state.messageList.concat([data])
                    });
                    self.setStatus("getting message from the server.");
                    setTimeout(function () {
                        self.setStatus("");
                    }, 500);
                }
            });
            socket.on('close', function () {
                console.log('closing from client');
            });
        });
    }

    openSocket(id) {
        this.setState({
            id: id
        });
        console.log('opening socket now');
        socket = eio('ws://localhost:8888');
        this.setState({
            sockId: socket.id
        });
    }

    sendMessage(message) {
        this.setStatus("sending message");
        var msgObject = {
            message: message,
            id: this.state.id
        };
        setTimeout(function () {
            socket.send(JSON.stringify(msgObject))
        }, 1000)
    }

    render() {
        var showChat = this.state.showChat;
        if (showChat) {
            return React.createElement(chatRoom, {
                registerSocketEvents: this.registerSocketEvents,
                sendMessage: this.sendMessage,
                deleteMessage: this.deleteMessage,
                sendEdittedMessage: this.sendEdittedMessage,
                messageList: this.state.messageList,
                time: this.state.time,
                socketId: socket.id,
                status: this.state.status
            }, null)
        } else {
            return React.createElement(userName, {
                changePage: this.changePage,
                openSocket: this.openSocket
            }, null)
        }
    }
}
module.exports = ChatApp;
