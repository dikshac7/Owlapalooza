const { join } = require("path");
const express = require("express");
const logger = require("pino")();
const expressLogger = require("express-pino-logger")({
  logger,
});
const tokensController = require("./controllers/tokensController");
const app = express();

app.use(expressLogger);
app.use(express.static(join(__dirname, "..", "client", "dist")));

app.use("/tokens", tokensController);

app.post('/submit', (req, res) => {
  client.messages
    .create({
       body: "Thanks for volunteering at Creator Connections. Here is the image you submitted!",
       from: +17072078510,
       to: +18646507758
     })
    .then(function(message){
          res.send(JSON.stringify(message, undefined, 2));
          res.end();
        })
    .catch(function(error) {
          res.send(JSON.stringify(error, undefined, 2));
          res.end();
      });
})

module.exports = { app, logger };
