'use strict';

angular.module('triviziApp')
  .directive('dateDeparture', function () {
    return {
      templateUrl: 'app/filters/dateDeparture/dateDeparture.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });