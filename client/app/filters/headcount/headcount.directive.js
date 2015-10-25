'use strict';

angular.module('triviziApp')
  .directive('headcount', function () {
    return {
      templateUrl: 'app/filters/headcount/headcount.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });