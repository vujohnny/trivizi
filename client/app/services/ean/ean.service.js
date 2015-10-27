'use strict';

angular.module('triviziApp')
  .service('ean', function ($http) {
    /*
        * ean request $http call
        * $http() returns a $promise that we can add handlers with .then()
        * if getting cross origin error install 
        * http://bit.ly/1zhiKzg 
    */ 
    return {
    	eanRequest:function ($scope){
            $http({
                method: 'jsonp',
                url: 'http://api.ean.com/ean-services/rs/hotel/v3/list?callback=JSON_CALLBACK',
                params: { 
                    "apiKey": "70303auc6h8hqutunreio3u8pl",
                    "minorRev": "99",
                    "locale": "en_US",  
                    "cid": "55505",
                    "destinationString": $scope.specificLocation,
                    "arrivalDate": "11/19/2015", //"11/19/2015", //$scope.calendarArrive,
                    "departureDate": "11/22/2015", //"11/20/2015", //$scope.calendarDepart,
                    "curencyCode": "USD",
                    "numberOfResults": "200",
                    "room1": $scope.numberOfAdults                    
                }
            })
                .then(function (response) {

                    console.log(response.data);
                    $scope.deleteMarkers();
                    $scope.resultsList = [];
                    $.each(response.data.HotelListResponse.HotelList.HotelSummary, function(k, v) {

                        var lat 				= v.latitude, 
                            lng 				= v.longitude,
                            id		 			= v.hotelId,
                            name 				= v.name.replace("&amp;","&"), 
                            shortDescription 	= v.shortDescription, 
                            listImg 			= v.thumbNailUrl.replace("_t", "_z"),
                            listImgFall			= v.thumbNailUrl.replace("_t", "_b"),
                            rating				= v.tripAdvisorRating, 
                            ratingImg			= v.tripAdvisorRatingUrl,
                            ratingCount         = v.tripAdvisorReviewCount,
                            rateAverage 		= v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"],
                            roundedAverage 		= Math.round(rateAverage),
                            rateTotal 			= v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"],
                            roundedTotal 		= Math.round(rateTotal),
                            totalNights 		= v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom["@size"],
                            link				= v.deepLink.replace(/&amp;/g, '&');
                        
                        $scope.buildReturn(lat, lng, id, name, shortDescription, listImg, rating, ratingImg, ratingCount, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall, totalNights);

                    }); // end each loop
                
                    $scope.panMap($scope.resultsList[0].id, $scope.resultsList[0].markerId);
                }); // end promise for http request	
        }
    }
            
  });
