// Geo Math: http://turfjs.org/
const { point, distance } = require('@turf/turf')

const moment = require('moment')
const { ceil } = require('lodash')

module.exports = {
    stringToReverseArray(str) {
        if (typeof str !== 'string') throw new Error('Input must be of type String')

        // Assuming punctuation should be removed
        const punctuation = ['"','!',',','.','-']

        return str
            // Test for punctuation
            .split('')
            .filter((char => !punctuation.includes(char)))
            .join('')

            // Turn into array and reverse
            .split(' ')
            .reverse()
    },
    orderArray(arr) {
        function convertToNumber(str) {
            if (typeof str !== 'string') {
                throw new Error('Input must be of type String')
            }

            const num = Number(str)

            if (isNaN(num)) {
                throw new Error('Elements in array must be convertable to type Number')
            }

            return num
        }
        return arr
            .map(el => {
                if (typeof(el) === 'number') {
                    return el
                }
                return convertToNumber(el)
            })
            .sort()
    },
    getDiffArray(a, b) {
        return a.filter( el => b.indexOf(el) < 0)
    },
    getDistance: (p1, p2) => {
        let points
        try {
            points = {
                p1: point([p1.lon, p1.lat]),
                p2: point([p2.lon, p2.lat])
            }
        } catch (e) {
            throw new Error('Error parsing points, must be in format { lon: Number, lat: Number }: ' + e)
        }
        const opts = { units: 'miles' }
        
        let geo_distance = distance(points.p1, points.p2, opts)
        geo_distance = ceil(geo_distance, 2)
        return String(geo_distance)
    },
    getHumanTimeDiff(t1, t2) {
        let times
        try {
            times = {
                t1: moment(t1, null, true),
                t2: moment(t2, null, true)
            }
            if ( !times.t1.isValid() || !times.t2.isValid()) {
                throw 'Invalid Date'
            }
        } catch (e) {
            throw new Error('Error parsing times: ' + e)
        }
        
        return moment
            .duration(times.t1.diff(times.t2))
            .humanize(true)
    }
}