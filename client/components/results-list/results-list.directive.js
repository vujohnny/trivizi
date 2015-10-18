'use strict';

angular.module('triviziApp')
  .directive('resultsList', function () {
    return {
      templateUrl: 'components/results-list/results-list.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
