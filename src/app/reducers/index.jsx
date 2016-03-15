var _ = require('lodash');
var ActionTypes = require('../constants').ActionTypes;
var combineReducers = require('redux').combineReducers;
var routeReducer = require('redux-simple-router').routeReducer;

var initialState = {};
/* eslint-disable */
var _toConsumableArray = function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
};
/* eslint-enable */

var toDo = function toDo(state, action) {
  switch (action.type) {
  case ActionTypes.ADD_TASK:
    return {
      id: action.id,
      text: action.text,
      status: action.status,
      dateModified: action.dateModified,
    };
  case ActionTypes.TOGGLE_TASK:
    if (state.id !== action.id) {
      return state;
    }

    return _.assign({}, state, {
      completed: !state.completed,
    });
  default:
    return state;
  }
};

var toDoList = function toDoList() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
  case ActionTypes.ADD_TASK:
    return _.concat(_toConsumableArray(state), [toDo(undefined, action)]
    );
  case ActionTypes.TOGGLE_TASK:
    return state.map(function toggleTask(t) {
      return toDo(t, action);
    });
  default:
    return state;
  }
};

var filterToDoList = function filterToDoList() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'SHOW_ALL' : arguments[0];
  var action = arguments[1];

  switch (action.type) {
  case ActionTypes.TOGGLE_VISIBILITY:
    return action.filter;
  default:
    return state;
  }
};

module.exports = combineReducers({
  toDoList: toDoList,
  filterToDoList: filterToDoList,
  routing: routeReducer,
});
