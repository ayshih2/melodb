This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `node src/server.js`

Run the server

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## API Calls

Please call the API as follows:

### `/api/user?email=EMAILHERE&type=liked GET`

  Returns all liked songs of the specified user.
  
### `/api/user?email=EMAILHERE&type=liked POST`

  Headers: Content-Type application/x-www-form-urlencoded
  
  Expects an x-www-form-urlencoded body with key songName and song name value.
  
  Adds song name to liked songs if the song is not in the likedSongs array, removes song name from liked songs if the song is in the likedSongs array.
  
### `/api/user POST`
  
  Creates a new user. Should only be called on login by a user. The endpoint will check if the user is already in the database and will add/ignore the user accordingly. Must have `email` in the body of the request.

### `/api/user?email=EMAILHERE&type=history&add=SONG or COMPARISON`

  Headers: Content-Type application/x-www-form-urlencoded
  
  Adds song history or comparison history to the specified user.
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **with add=song:**
  
  Expects an x-www-form-urlencoded body with key songName and song name value.
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **with add=comparison:**
  
  Expects an x-www-form-urlencoded body with keys songName1 and songName2 and values of the respective song names.
 
## Available Scripts (cont.)

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
