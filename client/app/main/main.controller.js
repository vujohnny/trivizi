'use strict';
(function() {

function MainController($scope, $http, socket, $filter, ean) {
	
		$scope.budgetAmount = 1000;
    		        
        $scope.typesOfPlaces = ['Romantic', 'Tropical', 'Party', 'Pets Ok', 'Family'];
  
        $scope.numberOfAdults = {
			"type": "select", 
			"name": "totalAdults",
			"value": "2", 
			"values": [ "1", "2", "3", "4", "5", "6", "7", "8"] 
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
        
        /*
	        * global functions for views, maps, builds
	        * main seekdeer function submit
	    */
    
        $scope.seekDeer = function() {
            //console.log("inside getCurrentValue");
            $http.post('/api/things', {
                name: "$"+$scope.budgetAmount+" | "+$scope.calendarArrive+" - "+$scope.calendarDepart+" | "+$scope.specificLocation
            });
            $scope.newThing = '';
            //$scope.showMap();
            ean.eanRequest($scope);
        };
	    
	    $('.disable-drop').click(function(event){
			event.stopPropagation();
		});
                
        /*
	        * watch functions for
	        * input fields
	        * budget, where, adults, calendar
	    */        
	    
        $scope.$watch("arriveDate.defaultValue", function(){
            $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
            //console.log("From: " + $scope.calendarArrive);
        });
        
        $scope.$watch("departDate.defaultValue", function(){
            $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
            //console.log("To: " + $scope.calendarDepart);
        });
        
        $scope.$watch("budgetAmount", function(){
            //console.log($scope.budgetAmount);
        }); 
        
        $scope.$watch("numberOfAdults.value  ", function(){
            //console.log($scope.numberOfAdults.value);
        });         

	} // end MainController

angular.module('triviziApp').controller('MainController', MainController);})();


/*
    * angular directive for image source fallback
    * in case image size isnt provided
*/        
	    
angular.module('triviziApp').directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
            angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});