/**
 * Created by nicholas on 17-3-7.
 */
const Factory = require('../');

describe('Test bunyan aliyun', function (done) {
    it('Test log', () => {
        this.timeout(10000);
        let factory = new Factory({
            accessKey: '',
            secretKey: '',
            endpoint: '',
            projectName: '',
            logStoreName: ''
        });
        let logger = factory.createLogger('testlogger');
        logger.info('foo', 'bar');
        setTimeout(done, 7000);
    })
});