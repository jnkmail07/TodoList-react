var React = require('react');

var Header = React.createClass({
  render: function render() {
    return (
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="topTitle">
            <h1 className="orange">
              <i className="icon ion-ios-list-outline"/>
              <span>Todos</span>
            </h1>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Header;
