import jsdom from 'jsdom';

const mock = '<html><head></head><body></body></html>';

export default {
	defaultMock: mock,
	create(mock, callback) {
		jsdom.env(mock, {
			done(err, window) {
				if (err) {
					throw new Error(err);
				}

				global.window = window;
				global.document = window.document;

				callback();
			}
		});
	}
};
