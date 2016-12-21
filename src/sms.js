'use strict';
const crypto  = require("crypto");
const request = require("request");

let me = this;

const url = 'http://sms.aliyuncs.com/';
/**
 * 签名方法
 * @param  unsign param
 * @return query after sign
 */
me.signature = (param) => {
  let signStr = [];
  for (let i in param) {
    signStr.push(`${encodeURIComponent(i)}=${encodeURIComponent(param[i])}`);
  }
  signStr = signStr.join('&');
  signStr = 'POST&%2F&' + encodeURIComponent(signStr);
  const sign = crypto.createHmac("sha1", config.accessKeySecret + '&').update(signStr).digest('base64');
  const signature = encodeURIComponent(sign);
  let body = [`Signature=${signature}`];
  for (let key in param) {
    body.push(`${key}=${param[key]}`);
  }
  body = body.join('&');
  return body;
}
/**
 * config对象校验
 * @param config
 * @return Promise
 */
me.checkConfig = (config) => {
  let errArr = [];
  for(let key of config){
    if(typeof config[key] === 'undefined'){
      errArr.push(`${key} Missing`);
    }
  }
  if(errArr.length > 0){
    return Promise.reject(errArr.join(','));
  }else{
    return Promise.resolve(config);
  }
}

exports.send = (config) => {
  const nonce           = Date.now();
  const date            = new Date();
  /**
   * 所需参数
   * 详情可见 https://help.aliyun.com/document_detail/44362.html?spm=5176.doc44364.6.567.e46Go5
   */
  const param = {
    AccessKeyId: config.accessKeyID,
    Action: 'SingleSendSms',
    Format: 'JSON',
    ParamString: JSON.stringify(config.paramString),
    RecNum: config.recNum.join(','),
    RegionId: 'cn-hangzhou',
    SignName: config.signName,
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: nonce,
    SignatureVersion: '1.0',
    TemplateCode: config.templateCode,
    Timestamp: date.toISOString(),
    Version: '2016-09-27'
  };
  return me.checkConfig(param)
  .then((result) => {
    let body = me.signature(result);  
    return new Promise((resolve, reject) => {
      request({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: url,
        body: body,
        method: 'POST'
      }, function (err, res, body) {
        if(err) reject(err);
        resolve(body);
      })
    })
  })
}