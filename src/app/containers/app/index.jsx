var React = require('react');
var classNames = require('classnames');

var Header = require('../../components/header');
var Footer = require('../../components/footer');
var TaskList = require('../../components/taskList');
var LeftMenu = require('../../components/leftmenu');

var App = React.createClass({
  render: function render() {
    var navigationCSS = classNames('nav', 'navbar', 'navbar-default', 'navbar-fixed-top');
    return (
      <div id="wrapper">
        <div className={navigationCSS} role="navigation">
          <Header />
          <LeftMenu />
        </div>
        <TaskList />
        <Footer />
      </div>
    );
  },
});

module.exports = App;
