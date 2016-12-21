const sms = require(".");
const assert = require("assert");

const config = {
  accessKeyID       : '',
  accessKeySecret   : '',
  paramString       : {},
  recNum            : [''],
  signName          : '',
  templateCode      : '',
};

sms(config, (err, body) => {
  assert.ok(!err);
  body = JSON.parse(body);
  assert.ok(body.hasOwnProperty('Model'));
});