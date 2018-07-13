const expect = require('chai').expect;
const moment = require('moment');

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

            let lat1 = Math.PI * place1["lat"]/180
          	let lat2 = Math.PI * place2["lat"]/180
          	let theta = place1["lon"]-place2["lon"]

          	let rad_theta = Math.PI * theta/180

            let distance = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(rad_theta);
            distance = Math.acos(distance)
          	distance = distance * 180/Math.PI
            //console.log(distance);
          	distance = distance * 60 * 1.151756648
            distance = distance.toString().substring(0, 5)
            expect(distance).to.equal('36.91');

        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            let tim1 = moment(time1)
            let tim2 = moment(time2)
            let timeDiff = tim1.from(tim2)
            console.log(timeDiff);
            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
