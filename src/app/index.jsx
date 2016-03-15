// noinspection JSUnusedLocalSymbols
var React = require('react');
var render = require('react-dom').render;
var createStore = require('redux').createStore;
var compose = require('redux').compose;
var applyMiddleware = require('redux').applyMiddleware;
var Provider = require('react-redux').Provider;
var thunk = require('redux-thunk');

var reducers = require('./reducers');
var App = require('./containers/app');

var store = compose(applyMiddleware(thunk))(createStore)(reducers);

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('app')
);
