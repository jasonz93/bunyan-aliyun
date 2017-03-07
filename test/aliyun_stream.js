/**
 * Created by nicholas on 17-3-7.
 */
const Factory = require('../');

describe('Test bunyan aliyun', function () {
    it('Test log', function (done) {
        this.timeout(10000);
        let factory = new Factory({
            accessKey: process.env.ALY_ACCESSKEY,
            secretKey: process.env.ALY_SECRETKEY,
            endpoint: 'cn-hangzhou.log.aliyuncs.com',
            projectName: 'agarage',
            logStoreName: 'test'
        });
        let logger = factory.createLogger('testlogger');
        logger.info('foo', 'bar');
        setTimeout(done, 7000);
    })
});