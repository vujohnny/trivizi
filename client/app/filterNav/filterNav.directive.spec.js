'use strict';

describe('Directive: filterNav', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/filterNav/filterNav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filter-nav></filter-nav>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the filterNav directive');
  }));
});
