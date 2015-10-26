'use strict';

describe('Directive: dateArrival', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/filters/dateArrival/dateArrival.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<date-arrival></date-arrival>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the dateArrival directive');
  }));
});