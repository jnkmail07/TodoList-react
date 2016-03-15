var React = require('react');
var _ = require('lodash');
var connect = require('react-redux').connect;

var TaskItem = require('../taskItem');
var DeletedTaskItem = require('../deletedTaskItem');
var CreateTaskBox = require('../createTaskBox');

var TaskList = React.createClass({
  processTasks: function processTasks(toDoList, type) {
    return _.map(_.orderBy(toDoList, 'dateModified', 'desc'), function display(task, i) {
      var html = '';
      if (type === 'delete') {
        html = (<DeletedTaskItem
          key={i}
          id={task.id}
          text={task.text}
          status={task.status}
          dateModified={task.dateModified}
        />);
      } else {
        html = (
          <TaskItem
            key={i}
            id={task.id}
            text={task.text}
            status={task.status}
            dateModified={task.dateModified} />
        );
      }
      return html;
    });
  },
  displayTasks: function displayTasks() {
    var taskList = localStorage.getItem('taskList');
    var toDoList = [];
    if (taskList !== null) {
      toDoList = JSON.parse(taskList);
    }
    return this.processTasks(_.concat(_.filter(toDoList,
      { type: 'CREATED_TASK' }), _.filter(toDoList,
      { type: 'TOGGLE_STATUS' })), '');
  },
  displayDeletedTasks: function displayTasks() {
    var taskList = localStorage.getItem('taskListHistory');
    var toDoList = [];
    if (taskList !== null) {
      toDoList = JSON.parse(taskList);
    }
    return this.processTasks(_.filter(toDoList, { type: 'DELETED_TASK' }), 'delete');
  },
  render: function render() {
    var tasks = this.displayTasks();
    var deletedTasks = this.displayDeletedTasks();
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="content">
                <div className="task-list">
                  <h2>Todo List</h2>
                  <CreateTaskBox
                    updateTask={this.displayTasks} />
                  <ul className="list-group col-md-8">
                    {tasks}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <div className="content">
                <div className="history-list">
                  <h3>Deleted Tasks</h3>
                  <ul className="list-group col-md-8">
                    {deletedTasks}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = connect(function mapStateToProps(state) {
  return { todos: state.todos };
})(TaskList);
