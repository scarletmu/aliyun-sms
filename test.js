const sms = require(".");
const assert = require("assert");
const config = require('./config');

const config = {
  accessKeyID       : config.accessKeyID,
  accessKeySecret   : config.accessKeySecret,
  paramString       : {code: '123456', duration: '1'},
  recNum            : ['18612341234'],
  signName          : config.signName,
  templateCode      : config.templateCode,
};

sms.send(config)
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.error(err);
})