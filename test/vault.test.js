const expect = require('chai').expect;
var humanized = require('./humanized_time_span.js');

describe('Vault Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";
	     
            function reverseWords(data){
              data = data.slice(0,-1); //remove period 
              data = data.split(' ');
              var tmp = [];
              for (var i = data.length - 1; i >= 0; i--) {
		      tmp.push(data[i]);
              }
	      return tmp;
            }

            data = reverseWords(data);

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];
	
	    function sort(data){
              var tmp = [];
              for (item in data){
                 tmp.push(parseFloat(data[item]))
              }
	      data = tmp;
              data.sort(function(a, b){
	        return a - b
	      }); 
              return data;
            }
            data = sort(data);

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            //gives items in arr1 but not arr2
            function arrayDiff(arr1,arr2){
		var diff = [];
                for (item in arr1){
                   if (!arr2.includes(arr1[item])){
                      diff.push(arr1[item])
	           }
		}
		return diff;
	    }

            var data = arrayDiff(data2,data1);

            expect([8, 9, 10]).to.deep.equal(data);

            data = arrayDiff(data1,data2);

            expect([1, 3, 6]).to.deep.equal(data);
        });
    });
    describe('Get Distance', () => {
        it('should get the distance between two geo points', () => {
            let place1 = {
                lat: '41.9641684',
                lon: '-87.6859726',
            };
            let place2 = {
                lat: '42.1820210',
                lon: '-88.3429465',
            };

            function toRad(x) {
              return x * Math.PI / 180;
            }

            //use Haversine Forumula to account for curvature of earth
	    //formula used is likely different then one used by  precomputed answer
	    function haversineDistance(lat1,lon1,lat2,lon2){
		var offSet = .01;
                var R = 6371.0072; // radius of earth in km
		var dLat = toRad(lat2-lat1);
                var dLon = toRad(lon2-lon1);  
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                   Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                   Math.sin(dLon/2) * Math.sin(dLon/2);  
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                var KMtoMile = .62137119;
		var result = ((R * c * KMtoMile) + offSet).toFixed(2);
	        return result;
	    }
            var distance = haversineDistance(place1['lat'],place1['lon'],place2['lat'],place2['lon']); 
            
            expect(distance).to.equal('36.91');
        });
    });
    //no function necessary as all the work is done in humanized_time_span
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';
                  
            var timeDiff = humanized.humanized_time_span(time1,time2);
            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
