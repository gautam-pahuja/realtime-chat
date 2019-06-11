import React from 'react'

class messageLine extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            message: this.props.message.msg.message,
            editClicked: false
        };
    }

    deleteMessage(id) {
        this.props.deleteMessage(id);
    }

    editMessage() {
        this.setState({
            editClicked: true
        });
    }

    setMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    sendMessage(id) {
        event.preventDefault();make
        if (this.state.message == "") {
            alert('Please type a message to send');
        } else {
            this.props.sendEdittedMessage(this.state.message, id);
            this.setState({
                editClicked: false
            });
        }
    }
    render() {
        var message = this.props.message;
        var id = this.props.id;
        var socketId = this.props.socketId;
        var self = this;
        if (this.state.editClicked) {
            return React.createElement("li", {
                    id: id
                }, React.createElement(
                    "form",
                    {
                        action: "",
                        onSubmit: function () {
                            self.sendMessage(id)
                        },
                        className: "edit-message-form"
                    },
                    React.createElement("input", {
                        id: "m",
                        type: "text",
                        value: this.state.message,
                        onChange: this.setMessage,
                        autoComplete: "off",
                        placeholder: "Edit your message."
                    }),
                    React.createElement(
                        "button",
                        {
                            type: "submit"
                        },
                        "Send"
                    )
                )
            )
        } else {
            return React.createElement("li", {
                    id: id
                }, React.createElement(
                    "span",
                    {
                        className: "name-span"
                    },
                    message.msg.id + ":"
                ),
                React.createElement(
                    "span",
                    {
                        className: "message"
                    },
                    message.msg.message
                ),
                React.createElement(
                    "span",
                    {
                        className: "time"
                    },
                    message.timestamp
                ),
                socketId == message.clientInfo.sentBy && message.msg.type != "new_user"
                    ?
                    React.createElement(
                        "span",
                        {
                            className: "delete-icon",
                            onClick: function () {
                                self.deleteMessage(id)
                            }
                        },
                        null
                    )
                    : "",
                socketId == message.clientInfo.sentBy && message.msg.type != "new_user"
                    ?
                    React.createElement(
                        "span",
                        {
                            className: "edit-icon",
                            onClick: self.editMessage
                        },
                        null
                    )
                    : ""
            )
        }
    }
}
module.exports = messageLine;
