const moment = require("moment");

module.exports = {
  reverse: str =>
    str
      .substr(0, str.length - 1)
      .split(" ")
      .reverse(),
  orderArr: arr => arr.map(str => parseFloat(str)).sort((a, b) => a - b),
  diffArr: (arr1, arr2) => arr2.filter(num => arr1.indexOf(num) === -1),
  timeDiffHum: (t1, t2) => {
    return `${moment(t2).diff(moment(t1), "hours")} hours ago`;
  },
  getDist: function(p1, p2) {
    // Destructured and rename input approprietly
    const { lat: lat1, lon: long1 } = p1;
    const { lat: lat2, lon: long2 } = p2;

    // const earthRadius = 3963; // wiki
    // const earthRadius = 3958.3; // equator radius
    // const earthRadius = 3950; // polar radius

    // The International Union of Geodesy and Geophysics (IUGG) recommends three values:
    // the arithmetic mean of the radii measured at the equator and the poles (R1);
    // the authalic radius, which is the radius of a sphere with the same surface area (R2);
    //  and the volumetric radius, which is the radius of a sphere having the same volume as the ellipsoid (R3).
    // [2] All three values are about 6,371 kilometres (3,959 mi).
    const earthRadius = 3959; // wiki median of 3
    const lat1Rad = this.toRadians(lat1);
    const lat2Rad = this.toRadians(lat2);

    const distBLat2Lat1 = this.toRadians(lat2 - lat1);
    const distBLong2Long1 = this.toRadians(long2 - long1);

    const a =
      Math.sin(distBLat2Lat1 / 2) * Math.sin(distBLat2Lat1 / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(distBLong2Long1 / 2) *
        Math.sin(distBLong2Long1 / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    const distFixedAsString = distance.toFixed(2).toString();
    return distFixedAsString;
  },
  toRadians: num => (Number(num) * Math.PI) / 180
};
