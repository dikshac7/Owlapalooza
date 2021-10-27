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

var twilio = require('twilio');

// Load configuration information from system environment variables.
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;



// Create an authenticated client to access the Twilio REST API
var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.use("/tokens", tokensController);


app.post('/submit', (req, res) => {

  client.messages
    .create({
       body: "Thanks for volunteering at Creator Connections. Here is the image you submitted!",
       mediaUrl: "",
       from: +17072078510,
       to: +18646507758
     })
    .then(function(message){
          res.send(JSON.stringify("Your message was successfully sent ", message.sid));
          res.end();
        })
    .catch(function(error) {
          res.send(JSON.stringify(error, undefined, 2));
          res.end();
      });
})


module.exports = { app, logger };
