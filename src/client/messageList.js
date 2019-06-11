import React from 'react'
import messageLine from './messageLine'

class messageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        var socketId = this.props.socketId;
        return React.createElement("ul",
            {
                id: "messages"
            },
            this.props.messageList.map(function (message, i) {
                var id = message.clientInfo.sentBy + "##" + message.messageId;
                return React.createElement(messageLine, {
                    id: id,
                    message: message,
                    socketId: socketId,
                    deleteMessage: self.props.deleteMessage,
                    sendEdittedMessage: self.props.sendEdittedMessage
                }, null);
            })
        )
    }
}
module.exports = messageList;
