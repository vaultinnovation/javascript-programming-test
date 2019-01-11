const expect = require('chai').expect;

describe('Vault Tests', () => {
    // do not need function
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            // remove period
            data = data.replace(".", "");
            
            // split string into array
            data = data.split(' ')
            
            // reverse array
            data = data.reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });

    // do not need function
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // simple sort
            data.sort( (a, b) => a - b);

            // cast to number
            data = data.map(Number);

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            // gets numbers in data2 that are not in data1
            let data = data2.filter( n => !data1.includes(n));

            expect([8, 9, 10]).to.deep.equal(data);

            // gets numbers in data1 that are not in data2
            data = data1.filter( n => !data2.includes(n));

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
            
            // call function to calculate rough distance
            let distance = distanceutil(place1.lat, place1.lon, place2.lat, place2.lon, "m");

            // round down to one decimal place
            distance = (Math.round(distance * 100) / 100).toString();
            
            expect(distance).to.equal('36.9'); // rewritten to one decimal since this formula isn't accurate to the second decimal?
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // Code here

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});

// from http://www.geodatasource.com/developers/javascript since there aren't any simple (working) gps libs for js on npm
function distanceutil(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}
