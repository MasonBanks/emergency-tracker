const moment = require('moment');

exports.sToMins = (s) => {
  let minutes = Math.floor(s / 60)
  let seconds = Math.round(s - minutes * 60)
  return `${minutes}:${seconds}`;
};

exports.getAverageTimes = (markedSafe, startTime) => {
  const arr = Object.values(markedSafe)
  const evacTimeSum = arr.reduce((acc, val) => {
    const singleEvacTime = val - startTime;
    acc += singleEvacTime
    return acc;
  }, 0)
  return sToMins(evacTimeSum / arr.length)
}
