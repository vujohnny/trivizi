'use strict';

describe('Controller: GoogleMapSDKCtrl', function () {

  // load the controller's module
  beforeEach(module('triviziApp'));

  var GoogleMapSDKCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoogleMapSDKCtrl = $controller('GoogleMapSDKCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
