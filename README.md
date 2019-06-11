

Create a simple chat application using node.js and the libraries given in the `package.json`
The chat does not need rooms and should simply be available to anyone who connects to it.

Think of a good project structure!
Impress us with readable, modern, modular, universal, functional, reactive, immutable, extendable, and testable code ;)


## Requirements

- The User is prompted to enter a nickname before he enters the chat. - done
- The User can send text messages displayed to everyone else who is connected. - done
- The User can delete his own previously sent messages. - done
- The Server can refuse to publish messages if they contain certain words from a static list. -done
- The User can see the following statuses of his message:
    - Sending - done
    - Rejected (rejected by the server because it contains swear-words) - done
    - Sent (accepted and published by server) - done
    - Deleted (hidden for other clients, crossed-out from own client) - done


### Optional

- The User can edit his own previously sent messages.
- Add css-transpiling to the build.
- Add hot-reloading feature to the build.


## Libraries

Do NOT use any other libraries or replace them with alternatives.

- express
- engine.io
- react
- react-dom
- rxjs (= optional. Usage is not required)


## Building

For convenience we shipped a simple webpack conf with babel (es2015, es2016, es2017, stage-0).
Feel free to use any language features you are confident with.

- `make` will build the app.
- `make env=production` will create a minified build.
- `make run` will start the app
- `make run env=production` will start the app in production mode
