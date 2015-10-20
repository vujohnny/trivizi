'use strict';

angular.module('triviziApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'app/navbar/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl'
    };
  });
