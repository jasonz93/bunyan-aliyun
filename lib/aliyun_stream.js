/**
 * Created by nicholas on 17-3-7.
 */
const stream = require('stream');
const util = require('util');
const BatchExecutor = require('batch-executor');
const ALY = require('aliyun-sdk');
const bunyan = require('bunyan');

function AliyunStream(options) {
    stream.Writable.call(this, {
        objectMode: true
    });
    this.$accessKey = options.accessKey;
    this.$secretKey = options.secretKey;
    this.$endpoint = options.endpoint;
    this.$projectName = options.projectName;
    this.$logStoreName = options.logStoreName;
    this.$executor = new BatchExecutor();
    this.$client = new ALY.SLS({
        accessKeyId: this.$accessKey,
        secretAccessKey: this.$secretKey,
        endpoint: this.$endpoint,
        apiVersion: '2015-06-01'
    });
    this.$executor.on('error', (err) => {
        this.emit('error', err);
    });
    this.$executor.on('execute', (batch, callback) => {
        this.$client.putLogs({
            projectName: this.$projectName,
            logStoreName: this.$logStoreName,
            logGroup: {
                logs: batch
            }
        }, (err, data) => {
            if (err) {
                callback(err);
            }
        })
    });
}

util.inherits(AliyunStream, stream.Writable);

function levelToStr(level) {
    switch (level) {
        case bunyan.TRACE:
            return 'TRACE';
        case bunyan.DEBUG:
            return 'DEBUG';
        case bunyan.INFO:
            return 'INFO';
        case bunyan.WARN:
            return 'WARN';
        case bunyan.ERROR:
            return 'ERROR';
        case bunyan.FATAL:
            return 'FATAL';
        default:
            return level.toString();
    }
}

AliyunStream.prototype._write = function (record, _enc, cb) {
    let log = {
        time: Math.floor(record.time.getTime() / 1000),
        contents: []
    };
    record.level = levelToStr(record.level);
    for (let key in record) {
        log.contents.push({
            key: key,
            value: record[key].toString()
        });
    }
    this.$executor.batch(log);
    cb();
};

module.exports = AliyunStream;