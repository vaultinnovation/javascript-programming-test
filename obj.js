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
  }
};
