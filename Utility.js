/**
 * Static class to hold our utility functions.
 * Note: Choosing pascal case for classes and static functions.
 */
class Utility {
    /**
     * Splits a string by white space or punctuation( . , ), removes
     * blank pieces, then returns the reverse of the split array.
     * @constructor
     */
    static StringToReverseWordArray (dataString) {
        return dataString.split(/\W+/).filter((token)=>token.length > 0).reverse();
    }

    /**
     * Converts the array to numbers and returns it sorted.
     * @constructor
     */
    static NumericOrderArray (dataArray) {
        return dataArray.map(Number).sort();
    }

    /**
     * Returns an array of elements that array 2 has that array 1 doesn't have.
     * @param dataArray1
     * @param dataArray2
     * @constructor
     */
    static GetDifferenceArray(dataArray1, dataArray2) {
        return dataArray2.filter((data)=>!dataArray1.includes(data));
    }

    /**
     * Returns the distance between two latitude and longitude points in miles as a string.
     * Reference: https://www.movable-type.co.uk/scripts/latlong.html
     * @param place1
     * @param place2
     * @constructor
     */
    static GetGeoDistanceInMilesAsString(place1, place2) {
        let lat1 = parseFloat(place1['lat']);
        let lat2 = parseFloat(place2['lat']);
        let lon1 = parseFloat(place1['lon']);
        let lon2 = parseFloat(place2['lon']);

        let earthRadiusInMiles = 3959;
        let degreesToRadians = Math.PI / 180;
        let halfCordLength = Math.sqrt(0.5 - Math.cos((lat2 - lat1) * degreesToRadians)/2 +
            Math.cos(lat1 * degreesToRadians) * Math.cos(lat2 * degreesToRadians) *
            (1 - Math.cos((lon2 - lon1) * degreesToRadians))/2);
        let angularDistance = 2 * Math.asin(halfCordLength);
        let distanceInMiles = earthRadiusInMiles * angularDistance;
        return (Math.round(distanceInMiles * 100) / 100).toString();
    }

    /**
     * Expects date parse-able strings and returns the difference as "[number] [units] [ago or ahead]"
     * Supported units: seconds, minutes, hours
     * @constructor
     */
    static GetHumanReadableTimeDifference(time1, time2) {
        let date1 = new Date(time1);
        let date2 = new Date(time2);
        //Determine if the time is in the future or past
        let suffix = 'ago';
        if (date1 > date2) {
            suffix = 'ahead';
        }
        let differenceInMilliseconds = Math.abs(new Date(time2) - new Date(time1));
        //Return human readable seconds
        let differenceInSeconds = differenceInMilliseconds / 1000;
        if (differenceInSeconds < 60) {
            return `${differenceInSeconds} seconds ${suffix}`;
        }
        //Return human readable minutes
        let differenceInMinutes = differenceInSeconds / 60;
        if (differenceInMinutes < 60) {
            return `${differenceInMinutes} minutes ${suffix}`;
        }
        //Return human readable hours
        let differenceInHours = differenceInMinutes / 60;
        return `${differenceInHours} hours ${suffix}`;
    }
}

module.exports = Utility;