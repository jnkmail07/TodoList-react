jest.dontMock('../components/searchbox');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var SearchBox = require('../components/searchbox');

describe('SearchBox', function() {

  it('can have its placeholder set from props', function() {

    var searchbox = TestUtils.renderIntoDocument(
      <SearchBox placeholder="test placeholder" onFilter={function(){}}/>
    );

    var inputNode = TestUtils.findRenderedDOMComponentWithTag(searchbox, 'input');

    expect(inputNode.getAttribute('placeholder')).toEqual('test placeholder');
  });

  it('can have its value set from props', function() {

    var searchbox = TestUtils.renderIntoDocument(
      <SearchBox defaultValue="test value" onFilter={function(){}}/>
    );

    var inputNode = TestUtils.findRenderedDOMComponentWithTag(searchbox, 'input');

    expect(inputNode.value).toEqual('test value');
  });

  it('trigger events on search button click', function() {

    var callback = jest.genMockFunction();

    var searchbox = TestUtils.renderIntoDocument(
      <SearchBox onFilter={callback}/>
    );

    var inputNode = TestUtils.findRenderedDOMComponentWithTag(searchbox, 'input');
    inputNode.value = 'test value';

    TestUtils.Simulate.change(inputNode);

    var buttonNode = TestUtils.findRenderedDOMComponentWithTag(searchbox, 'button');
    TestUtils.Simulate.click(buttonNode);

    expect(callback).toBeCalledWith('test value');
  });

});
