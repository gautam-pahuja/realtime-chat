

A simple chat application using node.js, engine.io, ReactJS. The chat does not have rooms and simply be available to anyone who connects to it.


The User is prompted to enter a nickname before he enters the chat.
The User can send text messages displayed to everyone else who is connected.
The User can delete his own previously sent messages.
The Server can refuse to publish messages if they contain certain words from a static list.
The User can see the following statuses of his message:
    - Sending
    - Rejected (rejected by the server because it contains swear-words)
    - Sent (accepted and published by server)
    - Deleted (hidden for other clients, crossed-out from own client)
The User can edit his own previously sent messages.

## Libraries

- express
- engine.io
- react
- react-dom


## Building

- `make` will build the app.
- `make env=production` will create a minified build.
- `make run` will start the app
- `make run env=production` will start the app in production mode
