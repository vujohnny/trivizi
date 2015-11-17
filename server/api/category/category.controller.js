/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/category              ->  index
 * POST    /api/category              ->  create
 * GET     /api/category/:id          ->  show
 * PUT     /api/category/:id          ->  update
 * DELETE  /api/category/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Category = require('./category.model');

Category.find({}).removeAsync()
    .then(function () {
        Category.create({
                city: "Paris, France",
                lat: 48.8588377,
                lng: 2.2775172,
                category: "romantic"
            }, {
                city: "Puerto Vallarta, Mexico",
                lat: 20.653407,
                lng: -105.225332,
                category: "romantic"
            }, {
                city: "Venice, Italy",
                lat: 45.440847,
                lng: 12.315515,
                category: "romantic"
            }, {
                city: "Honolulu, Oahu, Hawaii, United States",
                lat: 21.438912,
                lng: -158.000057,
                category: "romantic"
            }, {
                city: "Aruba, Caribbean",
                lat: 12.521110,
                lng: -69.968338,
                category: "romantic"
            }, {
                city: "New Orleans, Louisiana, United States",
                lat: 29.951066,
                lng: -90.071532,
                category: "romantic"
            }, {
                city: "Carmel, California, United States",
                lat: 36.555239,
                lng: -121.923288,
                category: "romantic"
            }, {
                city: "Monterey, California, United States",
                lat: 36.600238,
                lng: -121.894676,
                category: "romantic"
            }, {
                city: "Sinai, Egypt",
                lat: 29.669979,
                lng: 34.633123,
                category: "romantic"
            }, {
                city: "Las Vegas, Nevada, United States",
                lat: 36.169941,
                lng: -115.139830,
                category: "romantic"
            }, {
                city: "Playa del Carmen, Yucatan Peninsula, Mexico",
                lat: 20.629559,
                lng: -87.073885,
                category: "romantic"
            }, {
                city: "Cancun, Yucatan Peninsula, Mexico",
                lat: 21.161908,
                lng: -86.851528,
                category: "romantic"
            }, {
                city: "Miami Beach, Florida, United States",
                lat: 25.790654,
                lng: -80.130045,
                category: "romantic"
            }, {
                city: "Bora Bora, Society Islands, French Polynesia",
                lat: -16.500413,
                lng: -151.741490,
                category: "romantic"
            }, {
                city: "Maui, Hawaii, United States",
                lat: 20.798363,
                lng: -156.331925,
                category: "romantic"
            }, {
                city: "Cozumel, Yucatan Peninsula, Mexico",
                lat: 20.422984,
                lng: -86.922343,
                category: "romantic"
            }, {
                city: "Buenos Aires, Argentina",
                lat: -34.603684,
                lng: -58.381559,
                category: "romantic"
            }, {
                city: "Charleston, South Carolina, United States",
                lat: 32.776475,
                lng: -79.931051,
                category: "romantic"
            }, {
                city: "Kauai, Hawaii, United States",
                lat: 21.966108,
                lng: -159.573791,
                category: "romantic"
            }, {
                city: "Jamaica, Caribbean",
                lat: 18.109581,
                lng: -77.297508,
                category: "romantic"
            }, {
                city: "Nice, France",
                lat: 43.710173,
                lng: 7.261953,
                category: "romantic"
            }, {
                city: "Puerto Rico, Caribbean",
                lat: 18.220833,
                lng: -66.590149,
                category: "romantic"
            }, {
                city: "Palm Springs, California, United States",
                lat: 33.830296,
                lng: -116.545292,
                category: "romantic"
            }, {
                city: "Savannah, Georgia, United States",
                lat: 32.083541,
                lng: -81.099834,
                category: "romantic"
            }, {
                city: "San Jose del Cabo, Los Cabos, Baja California, Mexico",
                lat: 23.095799,
                lng: -109.709688,
                category: "romantic"
            }, {
                city: "Budapest, Central Hungary, Hungary",
                lat: 47.497912,
                lng: 19.040235,
                category: "romantic"
            }, {
                city: "St. Maarten-St. Martin, Caribbean",
                lat: 18.030827,
                lng: -63.073633,
                category: "romantic"
            }, {
                city: "Bali, Indonesia",
                lat: -8.409518,
                lng: 115.188916,
                category: "romantic"
            }, {
                city: "Acapulco, Pacific Coast, Mexico",
                lat: 16.853109,
                lng: -99.823653,
                category: "romantic"
            }, {
                city: "Barbados, Caribbean",
                lat: 13.193887,
                lng: -59.543198,
                category: "romantic"
            }, {
                city: "Mazatlan, Pacific Coast, Mexico",
                lat: 23.249415,
                lng: -106.411142,
                category: "romantic"
            }, {
                city: "St. Lucia, Caribbean",
                lat: 13.909444,
                lng: -60.978893,
                category: "romantic"
            }, {
                city: "Cayman Islands, Caribbean",
                lat: 19.313300,
                lng: -81.254600,
                category: "romantic"
            }, {
                city: "Antigua, Caribbean",
                lat: 28.352640,
                lng: -80.699051,
                category: "romantic"
            }, {
                city: "Turks and Caicos, Caribbean",
                lat: 21.713584,
                lng: -72.2523129,
                category: "romantic"
            }, {
                city: "Anguilla, Caribbean",
                lat: 18.220554,
                lng: -63.068615,
                category: "romantic"
            }, {
                city: "Corfu, Ionian Islands, Greece",
                lat: 39.624984,
                lng: 19.922346,
                category: "romantic"
            }, {
                city: "St. John, U.S. Virgin Islands, Caribbean",
                lat: 18.327472,
                lng: -64.739949,
                category: "romantic"
            }, {
                city: "Bermuda, Caribbean",
                lat: 28.377128,
                lng: -80.672178,
                category: "romantic"
            }, {
                city: "Kinki, Japan",
                lat: 34.695719,
                lng: 135.591921,
                category: "romantic"
            }, {
                city: "Mykonos, Cyclades, South Aegean, Greece",
                lat: 37.007359,
                lng: 25.257306,
                category: "romantic"
            }, {
                city: "Margarita Island, Venezuela",
                lat: 10.997072,
                lng: -63.911330,
                category: "romantic"
            }, {
                city: "Rhodes, South Aegean, Greece",
                lat: 36.434963,
                lng: 28.217483,
                category: "romantic"
            }, {
                city: "Manzanillo, Mexico",
                lat: 19.113809,
                lng: -104.338462,
                category: "romantic"
            }, {
                city: "Tuscany, Italy",
                lat: 43.771051,
                lng: 11.248621,
                category: "romantic"
            }, {
                city: "Majorca, Balearic Islands, Spain",
                lat: 39.695263,
                lng: 3.017571,
                category: "romantic"
            }, {
                city: "Cannes, France",
                lat: 43.552847,
                lng: 7.017369,
                category: "romantic"
            }, {
                city: "Capri, Italy",
                lat: 40.553201,
                lng: 14.222154,
                category: "romantic"
            }, {
                city: "Key West, Florida Keys, Florida, United States",
                lat: 24.555059,
                lng: -81.779987,
                category: "romantic"
            }, {
                city: "Sanibel Island, Florida, United States",
                lat: 26.443397,
                lng: -82.111512,
                category: "romantic"
            }, {
                city: "Santa Barbara, California, United States",
                lat: 34.420831,
                lng: -119.698190,
                category: "romantic"
            }, {
                city: "Cotswolds, England, United Kingdom",
                lat: 51.999666,
                lng: -1.699553,
                category: "romantic"
            }, {
                city: "Santa Catalina Island, Los Angeles County, CA",
                lat: 33.3889652,
                lng: -118.5249835,
                category: "romantic"
            }, {
                "city": "Rome, Italy",
                "lat": 41.902783,
                "lng": 12.496366,
                category: "cultural"
            }, {
                "city": "New York City, United States",
                "lat": 39.962598,
                "lng": -76.727745,
                category: "cultural"
            }, {
                "city": "Paris, France",
                "lat": 48.856614,
                "lng": 2.352222,
                category: "cultural"
            }, {
                "city": "London, England, United Kingdom",
                "lat": 51.507351,
                "lng": -0.127758,
                category: "cultural"
            }, {
                "city": "Athens, Attica, Greece",
                "lat": 37.983917,
                "lng": 23.729360,
                category: "cultural"
            }, {
                "city": "Cairo, Egypt",
                "lat": 30.044420,
                "lng": 31.235712,
                category: "cultural"
            }, {
                "city": "Bangkok, Thailand",
                "lat": 13.756331,
                "lng": 100.501765,
                category: "cultural"
            }, {
                "city": "Venice, Italy",
                "lat": 45.440847,
                "lng": 12.315515,
                category: "cultural"
            }, {
                "city": "Jerusalem, Israel",
                "lat": 31.768319,
                "lng": 35.213710,
                category: "cultural"
            }, {
                "city": "Machu Picchu, Peru",
                "lat": -13.163141,
                "lng": -72.544963,
                category: "cultural"
            }, {
                "city": "Boston, Massachusetts, United States",
                "lat": 42.360082,
                "lng": -71.058880,
                category: "cultural"
            }, {
                "city": "Amsterdam, North Holland Province, The Netherlands",
                "lat": 52.370216,
                "lng": 4.895168,
                category: "cultural"
            }, {
                "city": "Prague, Czech Republic",
                "lat": 50.075538,
                "lng": 14.437800,
                category: "cultural"
            }, {
                "city": "Washington DC, District of Columbia, United States",
                "lat": 38.907192,
                "lng": -77.036871,
                category: "cultural"
            }, {
                "city": "Florence, Italy",
                "lat": 43.769560,
                "lng": 11.255814,
                category: "cultural"
            }, {
                "city": "Montreal, Canada",
                "lat": 45.501689,
                "lng": -73.567256,
                category: "cultural"
            }, {
                "city": "Berlin, Germany",
                "lat": 52.520007,
                "lng": 13.404954,
                category: "cultural"
            }, {
                "city": "Singapore, Singapore",
                "lat": 1.280094,
                "lng": 103.850949,
                category: "cultural"
            }, {
                "city": "San Francisco, California, United States",
                "lat": 37.774929,
                "lng": -122.419416,
                category: "cultural"
            }, {
                "city": "San Juan, Puerto Rico, Caribbean",
                "lat": 18.466334,
                "lng": -66.105722,
                category: "cultural"
            }, {
                "city": "Dublin, Ireland",
                "lat": 53.349805,
                "lng": -6.260310,
                category: "cultural"
            }, {
                "city": "Sydney, New South Wales, Australia",
                "lat": -33.867487,
                "lng": 151.206990,
                category: "cultural"
            }, {
                "city": "Buenos Aires, Argentina",
                "lat": -34.603684,
                "lng": -58.381559,
                category: "cultural"
            }, {
                "city": "Vancouver, British Columbia, Canada",
                "lat": 49.282729,
                "lng": -123.120738,
                category: "cultural"
            }, {
                "city": "New Orleans, Louisiana, United States",
                "lat": 29.951066,
                "lng": -90.071532,
                category: "cultural"
            }, {
                "city": "Tulum, Yucatan Peninsula, Mexico",
                "lat": 20.211419,
                "lng": -87.465350,
                category: "cultural"
            }, {
                "city": "Dominican Republic, Caribbean",
                "lat": 18.735693,
                "lng": -70.162651,
                category: "cultural"
            }, {
                "city": "Istanbul, Turkey",
                "lat": 41.008238,
                "lng": 28.978359,
                category: "cultural"
            }, {
                "city": "Madrid, Spain",
                "lat": 40.416775,
                "lng": -3.703790,
                category: "cultural"
            }, {
                "city": "Jamaica, Caribbean",
                "lat": 18.109581,
                "lng": -77.297508,
                category: "cultural"
            }, {
                "city": "Honolulu, Hawaii, United States",
                "lat": 21.306944,
                "lng": -157.858333,
                category: "cultural"
            }, {
                "city": "San Antonio, Texas, United States",
                "lat": 29.424122,
                "lng": -98.493628,
                category: "cultural"
            }, {
                "city": "Quebec City, Quebec, Canada",
                "lat": 46.803283,
                "lng": -71.242796,
                category: "cultural"
            }, {
                "city": "Barbados, Caribbean",
                "lat": 13.193887,
                "lng": -59.543198,
                category: "cultural"
            }, {
                "city": "Bali, Indonesia",
                "lat": -8.409518,
                "lng": 115.188916,
                category: "cultural"
            }, {
                "city": "Melbourne, Australia",
                "lat": -37.814107,
                "lng": 144.963280,
                category: "cultural"
            }, {
                "city": "Vienna, Austria",
                "lat": 48.208174,
                "lng": 16.373819,
                category: "cultural"
            }, {
                "city": "Mexico City, Mexico",
                "lat": 19.432608,
                "lng": -99.133208,
                category: "cultural"
            }, {
                "city": "Tokyo, Japan",
                "lat": 35.709026,
                "lng": 139.731992,
                category: "cultural"
            }, {
                "city": "New Delhi, India",
                "lat": 28.613939,
                "lng": 77.209021,
                category: "cultural"
            }, {
                "city": "Mumbai, India",
                "lat": 19.075984,
                "lng": 72.877656,
                category: "cultural"
            }, {
                "city": "Kyoto, Japan",
                "lat": 35.011636,
                "lng": 135.768029,
                category: "cultural"
            }, {
                "city": "Lima, Peru",
                "lat": -12.046374,
                "lng": -77.042793,
                category: "cultural"
            }, {
                "city": "Edinburgh, United Kingdom",
                "lat": 55.953252,
                "lng": -3.188267,
                category: "cultural"
            }, {
                "city": "Santiago, Chile",
                "lat": -33.448890,
                "lng": -70.669265,
                category: "cultural"
            }, {
                "city": "Auckland, New Zealand",
                "lat": -36.848460,
                "lng": 174.763332,
                category: "cultural"
            }, {
                "city": "Osaka, Japan",
                "lat": 34.693738,
                "lng": 135.502165,
                category: "cultural"
            }, {
                "city": "Christchurch, New Zealand",
                "lat": -43.532054,
                "lng": 172.636225,
                category: "cultural"
            }, {
                "city": "Toronto, Canada",
                "lat": 43.653226,
                "lng": -79.383184,
                category: "cultural"
            }, {
                "city": "Fes, Morocco",
                "lat": 34.018125,
                "lng": -5.007845,
                category: "cultural"
            }, {
                "city": "Wellington, New Zealand",
                "lat": -41.286460,
                "lng": 174.776236,
                category: "cultural"
            }, {
                "city": "Kolkata, India",
                "lat": 22.572646,
                "lng": 88.363895,
                category: "cultural"
            }, {
                "city": "Nepal, Punjab, India",
                "lat": 31.8282647,
                "lng": 74.6906852,
                category: "cultural"
            }, {
                "city": "Brasilia, Brazil",
                "lat": -15.794229,
                "lng": -47.882166,
                category: "cultural"
            }, {
                "city": "Bhutan, Bihar, India",
                "lat": 26.2187173,
                "lng": 85.5072442,
                category: "cultural"
            }, {
                "city": "Orlando, Florida, United States",
                "lat": 28.538335,
                "lng": -81.379236,
                category: "family"
            }, {
                "city": "New York City, New York, United States",
                "lat": 40.712784,
                "lng": -74.005941,
                category: "family"
            }, {
                "city": "Paris, France",
                "lat": 48.856614,
                "lng": 2.352222,
                category: "family"
            }, {
                "city": "Playa del Carmen, Yucatan Peninsula, Mexico",
                "lat": 20.629559,
                "lng": -87.073885,
                category: "family"
            }, {
                "city": "Chicago, Illinois, United States",
                "lat": 41.878114,
                "lng": -87.629798,
                category: "family"
            }, {
                "city": "London, England, United Kingdom",
                "lat": 51.507351,
                "lng": -0.127758,
                category: "family"
            }, {
                "city": "Rome, Italy",
                "lat": 41.902783,
                "lng": 12.496366,
                category: "family"
            }, {
                "city": "Cancun, Yucatan Peninsula, Mexico",
                "lat": 21.161908,
                "lng": -86.851528,
                category: "family"
            }, {
                "city": "Barcelona, Catalonia, Spain",
                "lat": 41.385064,
                "lng": 2.173403,
                category: "family"
            }, {
                "city": "Anaheim, California, United States",
                "lat": 33.835293,
                "lng": -117.914504,
                category: "family"
            }, {
                "city": "San Diego, California, United States",
                "lat": 32.715738,
                "lng": -117.161084,
                category: "family"
            }, {
                "city": "Myrtle Beach, South Carolina, United States",
                "lat": 33.689060,
                "lng": -78.886694,
                category: "family"
            }, {
                "city": "Puerto Vallarta, Mexico",
                "lat": 20.653407,
                "lng": -105.225332,
                category: "family"
            }, {
                "city": "Washington DC, District of Columbia, United States",
                "lat": 38.907192,
                "lng": -77.036871,
                category: "family"
            }, {
                "city": "Bahamas, Caribbean",
                "lat": 25.034280,
                "lng": -77.396280,
                category: "family"
            }, {
                "city": "Boston, Massachusetts, United States",
                "lat": 42.360082,
                "lng": -71.058880,
                category: "family"
            }, {
                "city": "Fort Lauderdale, Florida, United States",
                "lat": 26.122439,
                "lng": -80.137317,
                category: "family"
            }, {
                "city": "Dublin, County Dublin, Ireland",
                "lat": 53.349805,
                "lng": -6.260310,
                category: "family"
            }, {
                "city": "Dominican Republic, Caribbean",
                "lat": 18.735693,
                "lng": -70.162651,
                category: "family"
            }, {
                "city": "Aruba, Caribbean",
                "lat": 12.521110,
                "lng": -69.968338,
                category: "family"
            }, {
                "city": "Puerto Rico, Caribbean",
                "lat": 18.220833,
                "lng": -66.590149,
                category: "family"
            }, {
                "city": "Athens, Attica, Greece",
                "lat": 37.983917,
                "lng": 23.729360,
                category: "family"
            }, {
                "city": "St. Maarten-St. Martin, Caribbean",
                "lat": 18.030827,
                "lng": -63.073633,
                category: "family"
            }, {
                "city": "Cayman Islands, Caribbean",
                "lat": 19.313300,
                "lng": -81.254600,
                category: "family"
            }, {
                "city": "Antigua, Caribbean",
                "lat": 28.352640,
                "lng": -80.699051,
                category: "family"
            }, {
                "city": "Munich, Germany",
                "lat": 48.135125,
                "lng": 11.581981,
                category: "family"
            }, {
                "city": "Bermuda, Caribbean",
                "lat": 28.377128,
                "lng": -80.672178,
                category: "family"
            }, {
                "city": "Copenhagen, Denmark",
                "lat": 55.676097,
                "lng": 12.568337,
                category: "family"
            }, {
                "city": "St. Kitts, Caribbean",
                "lat": 27.774940,
                "lng": -82.393768,
                category: "family"
            }, {
                "city": "Zihuatanejo, Mexico",
                "lat": 17.641669,
                "lng": -101.551695,
                category: "family"
            }, {
                "city": "Jamaica, Caribbean",
                "lat": 18.109581,
                "lng": -77.297508,
                category: "family"
            }, {
                "city": "Salzburg, Austria",
                "lat": 47.809490,
                "lng": 13.055010,
                category: "family"
            }, {
                "city": "Los Cabos, Mexico",
                "lat": 22.890533,
                "lng": -109.916737,
                category: "family"
            }, {
                "city": "Canary Islands, Spain",
                "lat": 28.291564,
                "lng": -16.629130,
                category: "family"
            }, {
                "city": "U.S. Virgin Islands, Caribbean",
                "lat": 18.335765,
                "lng": -64.896335,
                category: "family"
            }, {
                "city": "Maui, Hawaii, United States",
                "lat": 20.798363,
                "lng": -156.331925,
                category: "family"
            }, {
                "city": "Virginia Beach, Virginia, United States",
                "lat": 36.852926,
                "lng": -75.977985,
                category: "family"
            }, {
                "city": "Nashville, Tennessee, United States",
                "lat": 36.162664,
                "lng": -86.781602,
                category: "family"
            }, {
                "city": "Las Vegas, Nevada, United States",
                "lat": 36.169941,
                "lng": -115.139830,
                category: "sexy"
            }, {
                "city": "Aruba, Caribbean",
                "lat": 12.521110,
                "lng": -69.968338,
                category: "sexy"
            }, {
                "city": "Atlantic City, New Jersey, United States",
                "lat": 39.364283,
                "lng": -74.422927,
                category: "sexy"
            }, {
                "city": "Monte-Carlo, Monaco",
                "lat": 39.364283,
                "lng": -74.422927,
                category: "sexy"
            }, {
                "city": "Puerto Rico, Caribbean",
                "lat": 18.220833,
                "lng": -66.590149,
                category: "sexy"
            }, {
                "city": "St. Maarten-St. Martin, Caribbean",
                "lat": 18.030827,
                "lng": -63.073633,
                category: "sexy"
            }, {
                "city": "Curacao, Caribbean",
                "lat": 12.169570,
                "lng": -68.990020,
                category: "sexy"
            }, {
                "city": "Bahamas, Caribbean",
                "lat": 25.034280,
                "lng": -77.396280,
                category: "sexy"
            }, {
                "city": "Biloxi, Mississippi, United States",
                "lat": 30.396032,
                "lng": -88.885308,
                category: "sexy"
            }, {
                "city": "Sun City, North-West Province, South Africa",
                "lat": -25.359132,
                "lng": 27.100113,
                category: "sexy"
            }, {
                "city": "Shreveport, Louisiana, United States",
                "lat": 32.525152,
                "lng": -93.750179,
                category: "sexy"
            }, {
                "city": "Connecticut, United States",
                "lat": 41.603221,
                "lng": -73.087749,
                category: "sexy"
            }, {
                "city": "Tunica, Mississippi, United States",
                "lat": 34.684545,
                "lng": -90.382877,
                category: "sexy"
            }, {
                "city": "Rio de Janeiro, Brazil",
                "lat": -22.906847,
                "lng": -43.172896,
                category: "sexy"
            }, {
                "city": "New Orleans, LA",
                "lat": 29.951066,
                "lng": -80.130045,
                category: "sexy"
            }, {
                "city": "Miami Beach, FL",
                "lat": 25.790654,
                "lng": -80.130045,
                category: "sexy"
            }, {
                "city": "Honolulu, HI",
                "lat": 21.306944,
                "lng": -157.858333,
                category: "sexy"
            }, {
                "city": "New York, NY",
                "lat": 40.712784,
                "lng": -74.005941,
                category: "sexy"
            }, {
                "city": "San Diego, CA",
                "lat": 32.715738,
                "lng": -117.161084,
                category: "sexy"
            }, {
                "city": "Santa Barbara, CA",
                "lat": 34.420831,
                "lng": -119.698190,
                category: "sexy"
            }, {
                "city": "Napa Valley, Napa County, CA",
                "lat": 38.427431,
                "lng": -122.394330,
                category: "sexy"
            }, {
                "city": "Portland, Oregon",
                "lat": 45.523062,
                "lng": -122.676482,
                category: "sexy"
            }, {
                "city": "Seattle, Washington",
                "lat": 47.606209,
                "lng": -122.332071,
                category: "sexy"
            }, {
                "city": "Boston, Massachusetts",
                "lat": 42.360082,
                "lng": -71.058880,
                category: "sexy"
            }, {
                "city": "San Francisco, California",
                "lat": 37.774929,
                "lng": -122.419416,
                category: "sexy"
            }, {
                "city": "Chicago, Illinois",
                "lat": 41.878114,
                "lng": -87.629798,
                category: "sexy"
            }, {
                "city": "Los Angeles, California",
                "lat": 34.052234,
                "lng": -118.243685,
                category: "sexy"
            }, {
                "city": "Cabo San Lucas",
                "lat": 22.8963133,
                "lng": -109.9680176,
                category: "sexy"
            }, {
                "city": "Cancún, Mexico",
                "lat": 21.1215908,
                "lng": -86.9194802,
                category: "sexy"
            }, {
                "city": "Amsterdam, Netherlands",
                "lat": 52.3746329,
                "lng": 4.7585316,
                category: "sexy"
            }, {
                "city": "Barcelona, Spain",
                "lat": 41.3947688,
                "lng": 2.0787278,
                category: "sexy"
            }, {
                "city": "Dominican Republic, Caribbean",
                "lat": 18.735693,
                "lng": 18.735693,
                category: "tropical"
            }, {
                "city": "Playa del Carmen, Yucatan Peninsula, Mexico",
                "lat": 20.629559,
                "lng": -87.073885,
                category: "tropical"
            }, {
                "city": "Maui, Hawaii, United States",
                "lat": 20.798363,
                "lng": -156.331925,
                category: "tropical"
            }, {
                "city": "Cancun, Yucatan Peninsula, Mexico",
                "lat": 21.161908,
                "lng": -86.851528,
                category: "tropical"
            }, {
                "city": "Puerto Vallarta, Mexico",
                "lat": 20.653407,
                "lng": -105.225332,
                category: "tropical"
            }, {
                "city": "Miami Beach, Florida, United States",
                "lat": 25.790654,
                "lng": -80.130045,
                category: "tropical"
            }, {
                "city": "Phuket, Thailand",
                "lat": 7.951933,
                "lng": 98.338088,
                category: "tropical"
            }, {
                "city": "U.S. Virgin Islands, Caribbean",
                "lat": 18.335765,
                "lng": -64.896335,
                category: "tropical"
            }, {
                "city": "Cabo San Lucas, Mexico",
                "lat": 22.890533,
                "lng": -109.916737,
                category: "tropical"
            }, {
                "city": "Kauai, Hawaii, United States",
                "lat": 21.966108,
                "lng": -159.573791,
                category: "tropical"
            }, {
                "city": "Cozumel, Yucatan Peninsula, Mexico",
                "lat": 20.422984,
                "lng": -86.922343,
                category: "tropical"
            }, {
                "city": "San Diego, California, United States",
                "lat": 32.715738,
                "lng": -117.161084,
                category: "tropical"
            }, {
                "city": "Sydney, New South Wales, Australia",
                "lat": -33.867487,
                "lng": 151.206990,
                category: "tropical"
            }, {
                "city": "Tulum, Yucatan Peninsula, Mexico",
                "lat": 20.211419,
                "lng": -87.465350,
                category: "tropical"
            }, {
                "city": "Jamaica, Caribbean",
                "lat": 18.109581,
                "lng": -77.297508,
                category: "tropical"
            }, {
                "city": "Fort Lauderdale, Florida, United States",
                "lat": 26.122439,
                "lng": -80.137317,
                category: "tropical"
            }, {
                "city": "Bora Bora, French Polynesia",
                "lat": -16.500413,
                "lng": -151.741490,
                category: "tropical"
            }, {
                "city": "Ko Samui, Surat Thani Province, Thailand",
                "lat": 9.521416,
                "lng": 100.048214,
                category: "tropical"
            }, {
                "city": "Aruba, Caribbean",
                "lat": 12.521110,
                "lng": -69.968338,
                category: "tropical"
            }, {
                "city": "Nice, France",
                "lat": 43.710173,
                "lng": 7.261953,
                category: "tropical"
            }, {
                "city": "Myrtle Beach, South Carolina, United States",
                "lat": 33.689060,
                "lng": -78.886694,
                category: "tropical"
            }, {
                "city": "San Jose del Cabo, Mexico",
                "lat": 23.063656,
                "lng": -109.702438,
                category: "tropical"
            }, {
                "city": "Barbados, Caribbean",
                "lat": 13.193887,
                "lng": -59.543198,
                category: "tropical"
            }, {
                "city": "Bali, Indonesia",
                "lat": -8.409518,
                "lng": 115.188916,
                category: "tropical"
            }, {
                "city": "Boracay, Philippines",
                "lat": 11.967350,
                "lng": 121.924759,
                category: "tropical"
            }, {
                "city": "St. Lucia, Caribbean",
                "lat": 13.909444,
                "lng": -60.978893,
                category: "tropical"
            }, {
                "city": "Santorini, South Aegean, Greece",
                "lat": 36.416649,
                "lng": 25.432447,
                category: "tropical"
            }, {
                "city": "Grand Cayman, Caribbean",
                "lat": 28.402861,
                "lng": -80.673225,
                category: "tropical"
            }, {
                "city": "Virginia Beach, Virginia, United States",
                "lat": 36.852926,
                "lng": -75.977985,
                category: "tropical"
            }, {
                "city": "Corfu, Ionian Islands, Greece",
                "lat": 39.624984,
                "lng": 19.922346,
                category: "tropical"
            }, {
                "city": "Crete, Greece",
                "lat": 35.240117,
                "lng": 24.809269,
                category: "tropical"
            }, {
                "city": "Tenerife, Canary Islands, Spain",
                "lat": 28.463630,
                "lng": -16.251847,
                category: "tropical"
            }, {
                "city": "Maldives",
                "lat": 1.977247,
                "lng": 73.536103,
                category: "tropical"
            }, {
                "city": "Marbella, Spain",
                "lat": 36.510071,
                "lng": -4.882447,
                category: "tropical"
            }, {
                "city": "Mykonos, South Aegean, Greece",
                "lat": 37.446719,
                "lng": 25.328862,
                category: "tropical"
            }, {
                "city": "Balearic Islands, Spain",
                "lat": 39.534179,
                "lng": 2.857710,
                category: "tropical"
            }, {
                "city": "Malaga, Spain",
                "lat": 36.721261,
                "lng": -4.421266,
                category: "tropical"
            }, {
                "city": "Rio de Janeiro, Brazil",
                "lat": -22.906847,
                "lng": -43.172896,
                category: "tropical"
            }, {
                "city": "Margarita Island, Venezuela",
                "lat": 10.997072,
                "lng": -63.911330,
                category: "tropical"
            }, {
                "city": "Lamu Island, Coast Province, Kenya",
                "lat": -2.290435,
                "lng": 40.867747,
                category: "tropical"
            }, {
                "city": "Mar del Plata, Argentina",
                "lat": -38.005477,
                "lng": -57.542611,
                category: "tropical"
            }, {
                "city": "Camps Bay, Western Cape, South Africa",
                "lat": -33.951298,
                "lng": 18.383098,
                category: "tropical"
            }, {
                "city": "Durban, KwaZulu-Natal, South Africa",
                "lat": -29.858680,
                "lng": 31.021840,
                category: "tropical"
            }, {
                "city": "Vina del Mar, Valparaiso Region, Chile",
                "lat": -33.015348,
                "lng": -71.550028,
                category: "tropical"
            }, {
                "city": "Moorea, French Polynesia",
                "lat": -17.538843,
                "lng": -149.829523,
                category: "tropical"
            }, {
                "city": "Essaouira, Morocco",
                "lat": 31.508493,
                "lng": -9.759504,
                category: "tropical"
            }, {
                "city": "Byron Bay, New South Wales, Australia",
                "lat": -28.644162,
                "lng": 153.612379,
                category: "tropical"
            }, {
                "city": "Great Barrier Reef, Queensland, Australia",
                "lat": -16.447284,
                "lng": 145.817350,
                category: "tropical"
            }, {
                "city": "Malindi, Coast Province, Kenya",
                "lat": -3.219186,
                "lng": 40.116891,
                category: "tropical"
            }, {
                "city": "Seychelles",
                "lat": -4.679574,
                "lng": 55.491977,
                category: "tropical"
            }, {
                "city": "Surfers Paradise, Australia",
                "lat": -28.001171,
                "lng": 153.428317,
                category: "tropical"
            }, {
                "city": "Manzanillo, Mexico",
                "lat": 19.113809,
                "lng": -104.338462,
                category: "tropical"
            }, {
                "city": "Andalucia, Spain",
                "lat": 37.544271,
                "lng": -4.727753,
                category: "tropical"
            }, {
                "city": "Balearic Islands, Spain",
                "lat": 39.534179,
                "lng": 2.857710,
                category: "tropical"
            }, {
                "city": "St. Kitts, Caribbean",
                "lat": 27.774940,
                "lng": -82.393768,
                category: "tropical"
            }, {
                "city": "Bahamas, Caribbean",
                "lat": 25.034280,
                "lng": -77.396280,
                category: "tropical"
            }, {
                "city": "Acapulco, Mexico",
                "lat": 16.853109,
                "lng": -99.823653,
                category: "tropical"
            }

        );
    });

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(function (updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Categorys
exports.index = function (req, res) {
    Category.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Category from the DB
exports.show = function (req, res) {
    Category.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Category in the DB
exports.create = function (req, res) {
    Category.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Category in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Category.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Category from the DB
exports.destroy = function (req, res) {
    Category.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};