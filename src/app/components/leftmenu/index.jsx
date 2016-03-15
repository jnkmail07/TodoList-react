// noinspection JSUnusedLocalSymbols
var React = require('react');
var Link = require('react-router').Link;

var LeftMenu = function LeftMenu() {
  return (
    <div className="nav-default sidebar" role="navigation">
      <div className="sidebar-nav navbar-collapse collapse">
        <ul id="leftaccordion" className="nav">
          <li className="panel">
            <Link className="accordion-toggle" to="/">
              <i className="icon ion-ios-home"/>Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

module.exports = LeftMenu;
