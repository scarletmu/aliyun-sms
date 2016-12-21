# aliyun-sms
A Simple [Aliyun SMS Service](https://help.aliyun.com/product/44282.html) Service middleware, Based on Promise

## How to install
```
npm install aliyunsms
```

## Usage
[Detail param document](https://help.aliyun.com/document_detail/44362.html?spm=5176.doc44364.6.567.e46Go5)
```javascript
const sms = require('aliyunsms');

/**
 * Init Config, All value is required
 */
const config = {
  accessKeyID       : '', //String
  accessKeySecret   : '', //String
  paramString       : {}, //Object
  recNum            : [''], //Array
  signName          : '', //String
  templateCode      : '',  //String
};

sms.send(config)
.then((res) => {
  //On Success,return a RequestId
})
.catch((err) => {
  //On Error
})
```

## Error
 
[Offical Error Code Document](https://help.aliyun.com/document_detail/44365.html?spm=5176.doc44362.6.568.J2vaKq)