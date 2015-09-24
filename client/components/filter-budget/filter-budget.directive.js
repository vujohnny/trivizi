'use strict';

angular.module('triviziApp')
  .directive('filterBudget', function () {
    return {
      templateUrl: 'components/filter-budget/filter-budget.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
