# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Rules and Requirements

- Player wins by getting closer to 21 than the dealer, without going over 21
- Face cards are 10, Aces are worth either 1 or 11, any other card is worth its pip value
- Deck needs to be properly shuffled
- 2 cards are dealt to each player and dealer, clockwise; dealer's second card is face down
- Handle Aces as 11 (if score over 21, reduce Aces to 1)
- Stand (not ask for another card)
- Hit (ask for another card to get closer to 21)
- Dealer must hit if score is under 17

| Player \ Dealer | under 21    | exactly 21  | bust        |
| --------------- | ----------- | ----------- | ----------- |
| under 21        | Max wins    | Dealer wins | Player wins |
| exactly 21      | Player wins | Draw        | Player wins |
| bust            | Dealer wins | Dealer wins | Dealer wins |

### Possible Additions

- centralized state, like Redux, instead of prop drilling
- can add functionality for more than one deck used
- use classes intead of interfaces to create instances for creating objects
- can add a backend and database configuration for multiplayer
- handle splitting pairs
