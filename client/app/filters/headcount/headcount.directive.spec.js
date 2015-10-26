'use strict';

describe('Directive: headcount', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/filters/headcount/headcount.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<headcount></headcount>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the headcount directive');
  }));
});