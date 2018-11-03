const moment = require('moment');

const HHMMSS = (ms) => {
  const formatted = moment(ms).format('H:mm:ss');
  return formatted;
};

getAverageTimes = (markedSafe, startTime) => {
  if (markedSafe) {
    const totalTime = Object.values(markedSafe).reduce((acc, val) => {
      const time = val - startTime;
      acc += time;
      return acc;
    }, 0);
    return HHMMSS(totalTime / Object.keys(markedSafe).length);
  } return 'No data';
};

exports.generateEvacReports = ((reports) => {
  const humanReadableReports = Object.values(reports).reduce((acc, val) => {
    const report = {
      fireMarshall: val.adminId,
      date: moment.unix(val.startTime / 1000).format('llll'),
      headCount: Object.keys(val.inBuildingUsers).length,
      markedSafe: Object.keys(val.markedSafe).length,
      totalDuration: HHMMSS(val.finishTime - val.startTime),
      averageEvacTime: getAverageTimes(val.markedSafe, val.startTime),
      drill: val.drill,
    };
    acc.push(report);
    return acc;
  }, []);
  return humanReadableReports;
});
