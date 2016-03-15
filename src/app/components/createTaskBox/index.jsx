var React = require('react');
var addTodo = require('../../actions').addTodo;

var CreateTaskBox = React.createClass({
  _input: null,
  addTask: function addTask(event) {
    event.preventDefault();
    /* eslint-disable vars-on-top */
    var newTask = this._input.value;
    if (newTask.length > 1) {
      var taskList = [];
      var taskListHistory = [];
      var taskListObject = localStorage.getItem('taskList');
      var taskListObjectHistory = localStorage.getItem('taskListHistory');
      if (!newTask.trim()) {
        return;
      }

      var task = addTodo(newTask);
      /* eslint-enable vars-on-top */
      if (taskListObject !== null) {
        taskList = JSON.parse(taskListObject);
        taskListHistory = JSON.parse(taskListObjectHistory);
      }
      taskList.push(task);
      taskListHistory.push(task);
      localStorage.setItem('taskList', JSON.stringify(taskList));
      localStorage.setItem('taskListHistory', JSON.stringify(taskListHistory));
      this._input.value = '';
      /* eslint-disable no-console */
      console.dir(JSON.stringify(taskList));
      /* eslint-enable no-console */
      window.location.reload();
    }
  },
  render: function render() {
    return (
      <form className="form-inline addTaskBox" onSubmit={this.addTask}>
        <div className="col-md-10 input-group">
          <input className="form-control" placeholder="Add a todo..."
                 ref={function setInput(c) {this._input = c;}.bind(this)}/>
            <span className="input-group-btn">
              <button className="btn btn-success" type="submit">
                Add
              </button>
            </span>
        </div>
      </form>
    );
  },
});

module.exports = CreateTaskBox;
