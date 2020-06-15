const expect = require('chai').expect;
const humanizeDuration = require('humanize-duration');

// Return the distance between two points in miles
function geo_point_diff(place1, place2) {
    function degree_to_radian(degree) {
        return degree * Math.PI / 180;
    }

    // haversine function
    function hav(theta) {
        return Math.pow(theta / 2, 2);
    }

    const earth_radius = 3958.899; // average distance from center to surface

    // Convert degree to radians
    const p1 = { 
        lat: degree_to_radian(place1.lat),
        lon: degree_to_radian(place1.lon)
    };
    const p2 = { 
        lat: degree_to_radian(place2.lat),
        lon: degree_to_radian(place2.lon)
    };
    
    const lat_diff = p2.lat - p1.lat;
    const lon_diff = p2.lon - p1.lon;

    const h = hav(lat_diff) + Math.cos(p1.lat) * Math.cos(p2.lat) * hav(lon_diff);
    const d = 2 * earth_radius * Math.asin(Math.sqrt(h));

    return d;
}

describe('Vault Tests', () => {
    // No utility function - the solution is very short
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            // Remove punction from the string
            data = data.replace(new RegExp(/[^\w\s]/g), '');
            // Split on the space and reverse it
            data = data.split(' ').reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });

    // No utility function - The builtin sort function should be more than sufficient
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            data = data.map(num => parseFloat(num));
            data.sort();

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });

    // No utility function - this can be accomplished in one line each
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            // Find items in data2, but not data1
            let data = data2.filter(num => !data1.includes(num));

            expect([8, 9, 10]).to.deep.equal(data);

            // Find items in data1, but not data2
            data = data1.filter(num => !data2.includes(num));

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

            let distance = geo_point_diff(place1, place2).toFixed(2);

            expect(distance).to.equal('36.91');
        });
    });
    
    // No utility function - this is short enough
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            let diff_ms = new Date(time2) - new Date(time1);
            let timeDiff = `${humanizeDuration(diff_ms)} ago`;

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
