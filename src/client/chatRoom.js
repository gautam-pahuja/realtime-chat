import React from 'react'
import messageList from './messageList'
class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            message: ""
        };
    }

    componentDidMount() {
        this.props.registerSocketEvents();
    }

    setMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    sendMessage(e) {
        e.preventDefault();
        if (this.state.message == "") {
            alert('Please type a message to send');
        } else {
            this.props.sendMessage(this.state.message);
            this.setState({
                message: ""
            });
        }
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("span", {id: "status"}, this.props.status),
            React.createElement(messageList,{
                messageList: this.props.messageList,
                socketId: this.props.socketId,
                deleteMessage: this.props.deleteMessage,
                sendEdittedMessage: this.props.sendEdittedMessage
            }),
            React.createElement(
                "form",
                {
                    action: "",
                    onSubmit: this.sendMessage,
                    className: "chat-input-form"
                },
                React.createElement("input", {
                    id: "m",
                    type: "text",
                    value: this.state.message,
                    onChange: this.setMessage,
                    autoComplete: "off",
                    placeholder: "Type a message to send."
                }),
                React.createElement(
                    "button",
                    {
                        type: "submit"
                    },
                    "Send"
                )
            )
        );
    }
}
module.exports = ChatRoom;
