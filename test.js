const sms = require(".");
const assert = require("assert");
const config = require('./config');

const TestConfig = {
  accessKeyID       : config.accessKeyID,
  accessKeySecret   : config.accessKeySecret,
  paramString       : {code: '123456', duration: '1'},
  recNum            : [config.phone],
  signName          : config.signName,
  templateCode      : config.templateCode,
};

sms.send(TestConfig)
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.error(err);
})