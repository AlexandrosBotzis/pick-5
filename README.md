# Pick-5

## Description

Pick-5 is one Vue.js implementation of the popular lottery game in which player has to place the bet of 5 numbers out of 30.
After the selection process the draw process starts with game goal to reach more than 3 matches in order to have earnings.

In History Menu item user can be informed about the past attempts and delete selected entries.
By selecting an entry user can see more details about the attempt.

You can play the game in [Pick-5](alexandros.botzis.github.io/pick-5/) after successful login/registration using Firebase Authentication.

## Development Setup

```bash
# install dependencies
npm install

# build dist files
npm run build

# serve examples at localhost:8080
npm run serve

# run unit tests
npm run test:unit

# pre-commit check
enabled pre-commit check with lint-staged

```

## Architecture

The web application has been built using [Vue.js](https://github.com/vuejs/vue) & [Vuex](https://github.com/vuejs/vuex) as state management library.

Data are stored to [Google Firebase](https://firebase.google.com/) Firestore database.

Components have been built using the [Vuetify](https://github.com/vuetifyjs/vuetify) Material Component Framework

Build artifacts have been generated using [Webpack](https://github.com/webpack/webpack) bundler.
