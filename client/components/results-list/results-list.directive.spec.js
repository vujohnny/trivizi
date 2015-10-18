'use strict';

describe('Directive: resultsList', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('components/results-list/results-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<results-list></results-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the resultsList directive');
  }));
});
