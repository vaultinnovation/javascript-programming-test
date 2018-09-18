const expect = require('chai').expect;
const utils = require('../utils')

describe('Vault Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            // Assuming period is intentional
            let data = "I want this job.";

            data = utils.stringToReverseArray(data)

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });

        it('handles a string with punctuation', () => {
            // Since the first example has a period I'm assuming that all punctuation should be removed
            let data = 'Ryan exclaims, "I really, really want this job!"'
            data = utils.stringToReverseArray(data)
            expect(['job', 'this', 'want', 'really', 'really', 'I', 'exclaims', 'Ryan'])
        })

        it('handles empty string', () => {
            let data = ''
            data = utils.stringToReverseArray(data)
            expect(['']).to.deep.equal(data)
        })

        it('handles non string values', () => {
            let data = null
            expect(utils.stringToReverseArray.bind(data)).to.throw('Input must be of type String')

            data = undefined
            expect(utils.stringToReverseArray.bind(data)).to.throw('Input must be of type String')

            data = 2
            expect(utils.stringToReverseArray.bind(data)).to.throw('Input must be of type String')

            data = []
            expect(utils.stringToReverseArray.bind(data)).to.throw('Input must be of type String')
        })
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            data = utils.orderArray(data)

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });

        it('handles unconvertable strings', () => {
            let data = ['200,000']
            expect(utils.orderArray.bind(data)).to.throw
        })

        it('handles empty array', () => {
            let data = []
            data = utils.orderArray(data)
            expect(data).to.deep.equal([])
        })

        it('handles array of numbers', () => {
            let data = [200, 450, 2.5, 1, 505.5, 2];

            data = utils.orderArray(data)

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        })
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            let data = utils.getDiffArray(data2, data1) 

            expect([8, 9, 10]).to.deep.equal(data);

            data = utils.getDiffArray(data1, data2) 

            expect([1, 3, 6]).to.deep.equal(data);
        });

        it('handles empty array', () => {
            let data = utils.getDiffArray([], [])
            expect(data).to.deep.equal([])

            data = utils.getDiffArray([], [1, 2, 3])
            expect(data).to.deep.equal([])

            data = utils.getDiffArray([1, 2, 3], [])
            expect(data).to.deep.equal([1, 2, 3])
        })

        it('handles repeating values', () => {
            let data = utils.getDiffArray([], [])
            expect(data).to.deep.equal([])
        })
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

            const distance = utils.getDistance(place1, place2)

            expect(distance).to.equal('36.91');
        });
        
        it('handles non numbers', () => {
            let place1 = {
                lat: '41.9641684',
                lon: 'foo',
            };
            let place2 = {
                lat: '42.1820210',
                lon: '-88.3429465',
            };

            expect(utils.getDistance.bind(place1, place2)).to.throw;
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            const timeDiff = utils.getHumanTimeDiff(time1, time2)

            expect(timeDiff).to.equal('3 hours ago');
        });
        
        it('handles future dates', () => {
            let time1 = '2016-06-05T15:00:00';
            let time2 = '2016-06-05T12:00:00';

            const timeDiff = utils.getHumanTimeDiff(time1, time2)

            expect(timeDiff).to.equal('in 3 hours');
        })
        
        it('handles non time strings', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = 'foo';

            expect(utils.getHumanTimeDiff.bind(time1, time2)).to.throw
        })
    });
});