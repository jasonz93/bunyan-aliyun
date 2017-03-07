# bunyan-aliyun
[![npm](https://img.shields.io/npm/v/bunyan-aliyun.svg)](https://npm.taobao.org/package/bunyan-aliyun)

Adapt bunyan logger to Aliyun Log Service
API of logger is the same as bunyan.(Actually it's bunyan's logger)

## Quick start
```shell
$ npm install bunyan-aliyun
```
```javascript
const BunyanFactory = require('bunyan-aliyun');
const factory = new BunyanFactory({
    accessKey: 'your access key',
    secretKey: 'your secret access key',
    endpoint: 'your endpoint',
    projectName: 'your project name',
    logStoreName: 'your logstore name'
});

const logger = factory.createLogger('testLogger');
logger.info('foo', 'bar');
```

## Usage
### Events
Report event will be emitted after the stream reported logs to aliyun successfully.
```
logger.on('report', (result) => {})
```

### Methods
Initialize logger factory
```
new BunyanFactory({
    accessKey: 'your access key',
    secretKey: 'your secret access key',
    endpoint: 'your endpoint',
    projectName: 'your project name',
    logStoreName: 'your logstore name'
})
```
Create logger
```
factory.createLogger(name, level)
```