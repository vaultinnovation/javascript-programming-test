const expect = require('chai').expect;
const { degrees, radians } = require('radians')

describe('Vault Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            data = data.replace(".","").split(" ");
            data = data.reverse();
            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];
            data = data.map(Number);
            data = data.sort()

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            let data = []
            data2.forEach(function(item){
              let i = data1.indexOf(item)
              if(i != -1){
              }else{
                data.push(item)
              }
            });

            expect([8, 9, 10]).to.deep.equal(data);

            data = []
            data1.forEach(function(item){
              let i = data2.indexOf(item)
              if(i != -1){
              }else{
                data.push(item)
              }
            });

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
            const R = 6371e3

            let lat1 = place1["lat"]
            let lat2 = place2["lat"]
            let lat = place2["lat"] - place1["lat"]
            let lon = place2["lon"] - place1["lon"]
            console.log(lat, lon);

            var a = Math.sin(lat/2) * Math.sin(lat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(lon/2) * Math.sin(lon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            let distance = R * c;
            console.log(distance);
            expect(distance).to.equal('36.91');
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
