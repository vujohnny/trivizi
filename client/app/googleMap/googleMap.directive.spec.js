'use strict';

describe('Directive: googleMap', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('app/googleMap/googleMap.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<google-map></google-map>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the googleMap directive');
  }));
});
