var ActionTypes = require('../constants').ActionTypes;
var moment = require('moment');
var _ = require('lodash');

module.exports = {
  addTodo: function addTodo(text) {
    var taskListHistory = localStorage.getItem('taskListHistory');
    var history = [];
    if (taskListHistory !== null) {
      history = JSON.parse(taskListHistory);
    }
    return {
      type: ActionTypes.ADDED_TASK,
      id: history.length + 1,
      text: text,
      dateModified: moment().format('MMMM Do YYYY, h:mm:ss A'),
      status: 'active',
    };
  },

  retrieveTodo: function retrieveTodo(task) {
    var todoIndex;
    var updatedTask = {
      type: ActionTypes.TOGGLE_STATUS,
      id: task.id,
      text: task.text,
      dateModified: moment().format('MMMM Do YYYY, h:mm:ss A'),
      status: task.status,
    };
    var taskList = localStorage.getItem('taskList');
    var taskListHistory = localStorage.getItem('taskListHistory');
    var toDoList = [];
    var toDoListHistory = [];
    if (taskList !== null) {
      toDoList = JSON.parse(taskList);
    }
    if (taskListHistory !== null) {
      toDoListHistory = JSON.parse(taskListHistory);
    }
    todoIndex = _.findIndex(toDoListHistory, function find(o) { return o.id === task.id; });
    if (todoIndex > -1) {
      _.pullAt(toDoListHistory, todoIndex);
      toDoListHistory.push(updatedTask);
      localStorage.setItem('taskListHistory', JSON.stringify(toDoListHistory));
    }
    toDoList.push(updatedTask);
    localStorage.setItem('taskList', JSON.stringify(toDoList));
    window.location.reload();
  },

  toggleTodo: function toggleTodo(task) {
    var todoIndex;
    var updatedTask = {
      type: ActionTypes.TOGGLE_STATUS,
      id: task.id,
      text: task.text,
      dateModified: moment().format('MMMM Do YYYY, h:mm:ss A'),
      status: task.status === 'active' ? 'completed' : 'active',
    };
    var taskList = localStorage.getItem('taskList');
    var taskListHistory = localStorage.getItem('taskListHistory');
    var toDoList = [];
    var toDoListHistory = [];
    if (taskList !== null) {
      toDoList = JSON.parse(taskList);
    }
    if (taskListHistory !== null) {
      toDoListHistory = JSON.parse(taskListHistory);
    }
    todoIndex = _.findIndex(toDoListHistory, function find(o) { return o.id === task.id; });
    if (todoIndex > -1) {
      _.pullAt(toDoListHistory, todoIndex);
      toDoListHistory.push(updatedTask);
      localStorage.setItem('taskListHistory', JSON.stringify(toDoListHistory));
    }
    todoIndex = _.findIndex(toDoList, function find(o) { return o.id === task.id; });
    if (todoIndex > -1) {
      _.pullAt(toDoList, todoIndex);
      toDoList.push(updatedTask);
      localStorage.setItem('taskList', JSON.stringify(toDoList));
    }
    window.location.reload();
  },
  deleteTodo: function toggleTodo(task) {
    var todoIndex;
    var updatedTask = {
      type: ActionTypes.DELETED_TASK,
      id: task.id,
      text: task.text,
      dateModified: moment().format('MMMM Do YYYY, h:mm:ss A'),
      status: task.status,
    };
    var taskList = localStorage.getItem('taskListHistory');
    var toDoList = [];
    var activeToDoList = [];
    if (taskList !== null) {
      toDoList = JSON.parse(taskList);
    }
    todoIndex = _.findIndex(toDoList, function find(o) { return o.id === task.id; });
    if (todoIndex > -1) {
      _.pullAt(toDoList, todoIndex);
      activeToDoList = _.clone(toDoList);
      toDoList.push(updatedTask);
      localStorage.setItem('taskListHistory', JSON.stringify(toDoList));
      localStorage.setItem('taskList', JSON.stringify(activeToDoList));
    }
    window.location.reload();
  },
};
