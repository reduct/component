var jsdom = require('@reduct/build-tools').jsdom;
var mock = '<html><head></head><body></body></html>';

module.exports = {
    defaultMock: mock,

    create: function (mock, callback) {
        jsdom.env(mock, {
            done: function(err, window) {
                global.window = window;
                global.document = window.document;

                callback();
            }
        });
    }
};