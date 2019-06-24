const expect = require('chai').expect;

describe('Vault Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = 'I want this job.';

            // First remove the extra period, then split and reverse
            data = data
                .replace(/\./g, '')
                .split(' ')
                .reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // First massage the data into an array of int(s), then sort
            data = data.map(num => Number(num)).sort();

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            const arrayDiff = (compArray, target) => {
                // Filter each value of the target array, seeing if that's anywhere in the comparison
                return target.filter(val => compArray.indexOf(val) < 0);
            };

            let data = arrayDiff(data1, data2);

            expect([8, 9, 10]).to.deep.equal(data);

            // Reverse comparision direction
            data = arrayDiff(data2, data1);

            expect([1, 3, 6]).to.deep.equal(data);
        });
    });
    describe('Get Distance', () => {
        it('should get the distance between two geo points', () => {
            let place1 = {
                lat: '41.9641684',
                lon: '-87.6859726'
            };
            let place2 = {
                lat: '42.1820210',
                lon: '-88.3429465'
            };

            // Can't take credit for this so here's where I found it:
            // https://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates/
            const getDistance = (lat1, lon1, lat2, lon2) => {
                const R = 3959; // km (change this constant to get miles)
                const dLat = ((lat2 - lat1) * Math.PI) / 180;
                const dLon = ((lon2 - lon1) * Math.PI) / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((lat1 * Math.PI) / 180) *
                        Math.cos((lat2 * Math.PI) / 180) *
                        Math.sin(dLon / 2) *
                        Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = R * c;
                return d;
            };

            const distance = getDistance(
                place1.lat,
                place1.lon,
                place2.lat,
                place2.lon
            ).toPrecision(4);

            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            time1 = new Date(time1);
            time2 = new Date(time2);

            // Convert time strings to date objects, then divide to get hours
            const timeDiff = `${(time2.getTime() - time1.getTime()) /
                1000 /
                60 /
                60} hours ago`;

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
