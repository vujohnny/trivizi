'use strict';

describe('Directive: budget', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/filters/budget/budget.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<budget></budget>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the budget directive');
  }));
});