import {expect} from 'chai';
import {isDefined} from './isDefined.js';

describe('@reduct/component: utilities.isDefined', () => {
	it('should return a negative result if no value was passed.', () => {
		expect(isDefined()).to.equal(false);
	});

	it('should return a negative result if "null" was passed.', () => {
		expect(isDefined(null)).to.equal(false);
	});

	it('should return a positive result if a truthy boolean was passed.', () => {
		expect(isDefined(true)).to.equal(true);
	});

	it('should return a positive result if a falsy boolean was passed.', () => {
		expect(isDefined(false)).to.equal(true);
	});

	it('should return a positive result if the passed value is a string.', () => {
		expect(isDefined('test')).to.equal(true);
	});

	it('should return a positive result if the passed value is a number.', () => {
		expect(isDefined(2)).to.equal(true);
	});

	it('should return a positive result if the passed value is an object.', () => {
		expect(isDefined({})).to.equal(true);
	});

	it('should return a positive result if the passed value is a function.', () => {
		expect(isDefined(() => null)).to.equal(true);
	});
});
