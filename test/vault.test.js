const expect = require('chai').expect;
const geo = require('node-geo-distance');
const humanize = require('tiny-human-time');

function humanizeTimeDiff(time1, time2) {
    let date1 = new Date(time1);
    let date2 = new Date(time2);

    let suffix = '';

    if (date1.valueOf() < date2.valueOf()) {
        suffix  = ' ago';
    } else {
        suffix = ' until';
    }

    return humanize(date1, date2) + suffix;
}

function getGeoDistance(place1, place2) {

    // convert object structure to library's expected
    coord1 = {
        latitude: parseFloat(place1.lat),
        longitude: parseFloat(place1.lon)
    };
    coord2 = {
        latitude: parseFloat(place2.lat),
        longitude: parseFloat(place2.lon)
    };
    
    // find distance with haversine formula
    let distance = geo.haversineSync(coord2, coord1)

    // convert meters to miles and truncate decimals
    distance = (distance / 1609).toFixed(2);

    return distance.toString();
}

describe('Vault Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job."

            // no need for utility function, one line of code
            // A regular expression could be used here
            // to remove the period, but I went with the simplest solution

            data = data.slice(0, data.length - 1).split(" ").reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // no function, one line of code

            data = data.map(n => parseFloat(n)).sort();

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            // no function, pretty simple

            data = data2.filter(n2 => !data1.includes(n2));

            expect([8, 9, 10]).to.deep.equal(data);

            data = data1.filter(n1 => !data2.includes(n1));

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

            // as fun as it would be to delve into the math
            // surrounding finding geographic distances, in the real world I
            // usually leave heavy math related things to external libraries

            let distance = getGeoDistance(place1, place2);

            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // again, no need to reinvent the wheel here (library)
            // but I did include logic for suffixes to simulate
            // varying time values

            let timeDiff = humanizeTimeDiff(time1, time2);

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
