'use strict';
(function() {

function MainController($scope, $http, socket, $filter) {
        // accordion functions ======================================================
        $scope.oneAtATime = true;

        $scope.budget = {
            groupTitle: 'Budget',
            groupIcon: 'money',
            valueIcon: 'usd',
            defaultValue: 1000,
            slider: [{
                min: 50,
                max: 10000,
                step: 25
            }]
        };

        $scope.where = {
            groupTitle: 'Where',
            groupIcon: 'globe',
            defaultValue: {
                'Tropical': true
            },
            categories: [{
                name: 'Tropical'
            }, {
                name: 'Snowy'
            }, {
                name: 'Romantic'
            }, {
                name: 'Party'
            }, {
                name: 'City'
            }]
        };

        $scope.when = {
            groupTitle: 'When',
            groupIcon: 'calendar',
        };
        
        $scope.arriveDate = {
            defaultValue: new Date(),
            minDate: new Date() - 1,
            maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
            showweeks: false,
            mode: "month"
        }
        
        $scope.departDate = {
            defaultValue: new Date(),
            minDate: new Date() - 1,
            maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
            showweeks: false,
            mode: "month"
        };
        
        $scope.showSelected = function(input) {
            var object = [];
            for (var o in input) {
                if (input[o]) {
                    object.push(o);
                }
            }
            return object;
        };


        // submit button && expedia api call
        $scope.getCurrentValue = function() {
            //console.log("inside getCurrentValue");
            $http.post('/api/things', {
                name: "$"+$scope.budget.defaultValue+" | "+$scope.showSelected($scope.where.defaultValue)+" | "+$scope.calendarArrive+" - "+$scope.calendarDepart+" | "+$scope.specificLocation
            });
            $scope.newThing = '';
            
            expediaReturn($scope.specificLocation); 
        };
        
        
        // watch functions for budget && calendar && where
        $scope.$watch("budget.defaultValue", function(){
            console.log($scope.budget.defaultValue);
        });
        
        $scope.$watch("arriveDate.defaultValue", function(){
            $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
            console.log("From: " + $scope.calendarArrive);
        });
        
        $scope.$watch("departDate.defaultValue", function(){
            $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
            console.log("To: " + $scope.calendarDepart);
        });
        
        $scope.showSelected = function(input) {
            //console.log(input)
            var object = [];
            for (var o in input) {
                if (input[o]) {
                    object.push(o);
                }
            }
            return object;
        };


        // End accordion functions ======================================================
}

angular.module('triviziApp')
  .controller('MainController', MainController);

})();
