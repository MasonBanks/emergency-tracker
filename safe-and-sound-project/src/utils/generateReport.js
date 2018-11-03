const moment = require('moment');

const msToMins = (ms) => {
  const d = new Date(ms);
  return `${d.getUTCMinutes()}:${d.getUTCSeconds()}`;
};

getAverageTimes = (markedSafe, startTime) => {
  if (markedSafe) {
    const totalTime = Object.values(markedSafe).reduce((acc, val) => {
      const time = val - startTime;
      acc += time;
      return acc;
    }, 0);
    return msToMins(totalTime / Object.keys(markedSafe).length);
  } return 'No data';
};

exports.generateEvacReports = ((reports) => {
  const humanReadableReports = Object.values(reports).reduce((acc, val, index) => {
    const report = {
      fireMarshall: val.adminId,
      date: moment.unix(val.startTime / 1000).format('llll'),
      headCount: Object.keys(val.inBuildingUsers).length,
      totalDuration: msToMins(val.finishTime - val.startTime),
      averageEvacTime: getAverageTimes(val.markedSafe, val.startTime),
      drill: val.drill,
    };
    acc.push(report);
    return acc;
  }, []);
  console.log(humanReadableReports);
  return humanReadableReports;
});
