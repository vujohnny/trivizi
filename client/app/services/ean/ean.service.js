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
            eanRequest: function ($scope) {
                
                
                var timeStamp = Math.floor(Date.now() / 1000);
                var apiKey = "70303auc6h8hqutunreio3u8pl";
                var cid = "490388";
                var shared = "adfgo2dqlsv14";
                var sig = md5(apiKey + shared + timeStamp);
                
                var httpMethod = 'GET';
                var url = 'http://api.ean.com/ean-services/rs/hotel/v3/list?callback=JSON_CALLBACK';
                var params = {
                    "apiKey": apiKey,
                    "minorRev": "99",
                    "locale": "en_US",
                    "cid": cid,
                    "sig": sig,
                    "destinationString": $scope.specificLocation,
                    "arrivalDate": $scope.calendarArrive, //"11/19/2015", //$scope.calendarArrive,
                    "departureDate": $scope.calendarDepart, //"11/20/2015", //$scope.calendarDepart,
                    "curencyCode": "USD",
                    "numberOfResults": "200",
                    "room1": $scope.numberOfAdults                  
                }

                $http.jsonp(url, {
                    params: params
                }).success(function (response) {

                    //console.log(response);
                    $scope.deleteMarkers();
                    $scope.respondProvider = "ean";
                    $scope.resultsList = [];

                    $.each(response.HotelListResponse.HotelList.HotelSummary, function (k, v) {

                        var lat = v.latitude,
                            lng = v.longitude,
                            id = v.hotelId,
                            name = v.name.replace("&amp;", "&"),
                            shortDescription = v.shortDescription,
                            listImg = v.thumbNailUrl.replace("_t", "_z"),
                            listImgFall = v.thumbNailUrl.replace("_t", "_b"),
                            rating = v.tripAdvisorRating,
                            ratingImg = v.tripAdvisorRatingUrl,
                            ratingCount = v.tripAdvisorReviewCount,
                            rateAverage = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"],
                            roundedAverage = Math.round(rateAverage),
                            rateTotal = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"],
                            roundedTotal = Math.round(rateTotal),
                            totalNights = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom["@size"],
                            link = v.deepLink.replace(/&amp;/g, '&');

                        $scope.buildReturn(lat, lng, id, name, shortDescription, listImg, rating, ratingImg, ratingCount, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall, totalNights);

                    }); // end each loop
                    //console.log($scope.resultsList);
                    console.log("only EAN call and return, no Yelp");
                    if ($scope.resultsList.length > 0) {
                        $scope.panMap($scope.resultsList[0].id, $scope.resultsList[0].markerId);
                    }
                }); // end promise for http request	
            }
        }

    });


/*
 * angular directive for image source fallback
 * in case image size isnt provided
 */

angular.module('triviziApp').directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});