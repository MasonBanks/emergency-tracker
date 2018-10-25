const moment = require('moment');
const { getEvacReports } = require('../../api');

const msToMins = (ms) => {
  const d = new Date(1000 * Math.round(ms / 1000));
  return `${d.getUTCMinutes()}:${d.getUTCSeconds()}`;
};

getAverageTimes = (markedSafe, startTime) => Object.values(markedSafe).reduce((acc, val) => {
  const time = val - startTime;
  acc += time;
  return msToMins(acc / markedSafe.length);
}, 0);

getEvacReports((reports) => {
  const humanReadableReport = Object.values(reports).reduce((acc, val, index) => {
    const report = {
      fireMarshall: val.adminId,
      date: moment.unix(val.startTime).format('llll'),
      headCount: Object.keys(val.inBuildingUsers).length,
      totalDuration: msToMins(val.finishTime - val.startTime),
      averageEvacTime: getAverageTimes(val.markedSafe, val.startTime),
      drill: val.drill,
    };
    acc.push(report);
    return acc;
  }, []);
  return console.log(humanReadableReport);
});
