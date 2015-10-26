'use strict';

describe('Directive: dateDeparture', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/filters/dateDeparture/dateDeparture.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<date-departure></date-departure>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the dateDeparture directive');
  }));
});