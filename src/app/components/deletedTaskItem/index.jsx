var React = require('react');
var classNames = require('classnames');

var retrieveTodo = require('../../actions').retrieveTodo;

var DeletedTaskItem = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    dateModified: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  },
  retrieveStatus: function retrieveStatus(event) {
    /* eslint-disable vars-on-top */
    event.preventDefault();
    var task = {
      id: this.props.id,
      status: this.props.status,
      text: this.props.text,
    };
    retrieveTodo(task);
  },
  render: function render() {
    var taskId = 'taskItem_' + this.props.id;
    var badgeCss = classNames(
      'badge',
      { 'badge-active': this.props.status.toLowerCase() === 'active',
        'badge-completed': this.props.status.toLowerCase() === 'completed',
      }
    );
    return (
      <li className="list-group-item" id={taskId}>
        <div className="deleted" onClick={this.toggleStatus}>
          {this.props.text}
          <span className="pull-right">
            <span className={badgeCss}>
              {this.props.status.toUpperCase()}
            </span>
          </span>
        </div>
        <div>
          <span className="timestamp">Last Modified: {this.props.dateModified}</span>
          <a className="green" href="" disabled onClick={this.retrieveStatus} title="Retrieve todo">
            Retrieve
          </a>
        </div>
      </li>);
  },
});

module.exports = DeletedTaskItem;
