'use strict';

angular.module('triviziApp')
  .directive('destination', function () {
    return {
      templateUrl: 'app/filters/destination/destination.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });