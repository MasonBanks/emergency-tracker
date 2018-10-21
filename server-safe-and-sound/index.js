const app = require('./app');
const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) console.log('Server failed to connect to host');
  else console.log(`listening on port ${PORT}`);
});