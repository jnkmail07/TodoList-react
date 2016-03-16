jest.dontMock('../components/createTaskBox');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var CreateTaskBox = require('../components/createTaskBox');

describe('AddTaskBox', function() {

  it('has a placeholder', function() {

    var addTaskBox = TestUtils.renderIntoDocument(
      <CreateTaskBox placeholder="Add a todo..." onClick={function(){}}/>
    );

    var inputNode = TestUtils.findRenderedDOMComponentWithTag(addTaskBox, 'input');

    expect(inputNode.getAttribute('placeholder')).toEqual('Add a todo...');
  });

  it('can have its value set', function() {

    var addTaskBox = TestUtils.renderIntoDocument(
      <CreateTaskBox value="" onClick={function(){}}/>
    );

    var inputNode = TestUtils.findRenderedDOMComponentWithTag(addTaskBox, 'input');

    expect(inputNode.value).toEqual('');
  });
});
