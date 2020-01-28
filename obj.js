module.exports = {
  reverse: str =>
    str
      .substr(0, str.length - 1)
      .split(" ")
      .reverse()
};
