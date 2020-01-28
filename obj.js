module.exports = {
  reverse: str =>
    str
      .substr(0, str.length - 1)
      .split(" ")
      .reverse(),
  orderArr: arr => arr.map(str => parseFloat(str)).sort((a, b) => a - b)
};
