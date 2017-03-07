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
};

Factory.prototype.createRawStream = function () {
    return new AliyunStream({
        accessKey: this.$accessKey,
        secretKey: this.$secretKey,
        endpoint: this.$endpoint,
        projectName: this.$projectName,
        logStoreName: this.$logStoreName
    });
};

Factory.prototype.createLogger = function (name) {
    return bunyan.createLogger({
        name: name,
        streams: [
            {
                type: 'raw',
                stream: this.createRawStream()
            }
        ]
    })
};

module.exports = Factory;