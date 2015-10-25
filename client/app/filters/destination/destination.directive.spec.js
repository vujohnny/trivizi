'use strict';

describe('Directive: destination', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/filters/destination/destination.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<destination></destination>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the destination directive');
  }));
});