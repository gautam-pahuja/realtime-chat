import React from 'react'

class userName extends React.Component {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.sendValue = this.sendValue.bind(this);
        this.state = {
            userID: ""
        };
    }

    setValue(e) {
        this.setState({
            userID: e.target.value
        });
    }

    sendValue(e) {
        e.preventDefault();
        if (this.state.userID == "") {
            alert('Please enter a Username.');
        } else {
            this.props.openSocket(this.state.userID);
            this.props.changePage();
        }
    }

    render() {
        return React.createElement(
            "div",
            {className: "userName-wrapper"},
            React.createElement(
                "h1",
                {
                    className: 'user-input-title'
                },
                "Welcome to the chat app"
            ),
            React.createElement(
                'form',
                {
                    onSubmit: this.sendValue
                },
                React.createElement('input', {
                    type: 'text',
                    className: 'user-input',
                    placeholder: 'enter username',
                    value: this.state.userID,
                    autoComplete: "off",
                    onChange: this.setValue
                }),
                React.createElement(
                    'br',
                    null,
                    null
                ),
                React.createElement(
                    'br',
                    null,
                    null
                ),
                React.createElement(
                    'button',
                    {
                        className: 'enter-button',
                        type: "submit"
                    },
                    'Enter'
                )
            )
        )
    }
}
module.exports = userName;
