/**
 * Created by nicholas on 17-3-7.
 */
const bunyan = require('bunyan');
const AliyunStream = require('./aliyun_stream');

function Factory(options) {
    this.$accessKey = options.accessKey;
    this.$secretKey = options.secretKey;
    this.$endpoint = options.endpoint;
    this.$projectName = options.projectName;
    this.$logStoreName = options.logStoreName;
    if (this.$endpoint.indexOf('http://') !== 0 && this.$endpoint.indexOf('https://') !== 0) {
        this.$endpoint = 'http://' + this.$endpoint;
    }
}

Factory.prototype.createRawStream = function () {
    let stream = new AliyunStream({
        accessKey: this.$accessKey,
        secretKey: this.$secretKey,
        endpoint: this.$endpoint,
        projectName: this.$projectName,
        logStoreName: this.$logStoreName
    });
    stream.on('error', (err) => {
        console.error('An error occurs in Aliyun Log Service stream', err);
    });
    return stream;
};

Factory.prototype.createLogger = function (name) {
    let logger = bunyan.createLogger({
        name: name,
        streams: [
            {
                type: 'raw',
                stream: this.createRawStream()
            }
        ]
    });
    return logger;
};

module.exports = Factory;