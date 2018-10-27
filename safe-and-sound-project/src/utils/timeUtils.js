const moment = require('moment');

exports.HHMMSS = (secs) => {
  function padding(n) {
    return (`0${n}`).slice(-2);
  }
  let minutes = Math.floor(secs / 60);
  secs %= 60;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;
  return `${padding(hours)}:${padding(minutes)}:${padding(secs)}`;
};

// exports.sToMins = (s) => {
//   const minutes = Math.floor(s / 60);
//   const seconds = Math.round(s - minutes * 60);
//   return `${minutes}:${seconds}`;
// };

exports.getAverageTimes = (markedSafe, startTime) => {
  if (markedSafe) {
    const arr = Object.values(markedSafe);
    const evacTimeSum = arr.reduce((acc, val) => {
      const singleEvacTime = val - startTime;
      acc += singleEvacTime;
      return acc;
    }, 0);
    return this.HHMMSS(evacTimeSum / arr.length);
  } return 'N/A';
};
