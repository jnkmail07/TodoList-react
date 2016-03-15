var React = require('react');
var classNames = require('classnames');

var toggleTodo = require('../../actions').toggleTodo;
var deleteTodo = require('../../actions').deleteTodo;

var TaskItem = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    dateModified: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  },
  toggleStatus: function toggleStatus(event) {
    /* eslint-disable vars-on-top */
    event.preventDefault();
    var task = {
      id: this.props.id,
      status: this.props.status,
      text: this.props.text,
    };
    var toDelete = event.target.innerHTML === 'Delete';
    if (toDelete) {
      deleteTodo(task);
    } else {
      toggleTodo(task);
    }
  },
  render: function render() {
    var taskId = 'taskItem_' + this.props.id;
    var css = classNames('active', { 'completed': this.props.status === 'completed' });
    var badgeCss = classNames(
      'badge',
      { 'badge-active': this.props.status.toLowerCase() === 'active',
        'badge-completed': this.props.status.toLowerCase() === 'completed',
      }
    );
    return (
      <li className="list-group-item" id={taskId} draggable="true">
        <div className={css} onClick={this.toggleStatus}>
          {this.props.text}
          <span className="pull-right">
            <span className={badgeCss}>
              {this.props.status.toUpperCase()}
            </span>
          </span>
        </div>
        <div>
          <span className="timestamp">Last Modified: {this.props.dateModified}</span>
          <a className="red" href="" onClick={this.toggleStatus} title="Delete todo">
            Delete
          </a>
        </div>
      </li>);
  },
});

module.exports = TaskItem;
