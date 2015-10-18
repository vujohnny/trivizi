'use strict';

describe('Directive: introText', function () {

  // load the directive's module and view
  beforeEach(module('triviziApp'));
  beforeEach(module('components/intro-text/intro-text.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<intro-text></intro-text>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the introText directive');
  }));
});
