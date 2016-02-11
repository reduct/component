import {expect} from 'chai';
import {isFunction} from './isFunction.js';

describe('@reduct/component: utilities.isFunction', () => {
	it('should return a negative result if no value was passed.', () => {
		expect(isFunction()).to.equal(false);
	});

	it('should return a negative result if "null" was passed.', () => {
		expect(isFunction(null)).to.equal(false);
	});

	it('should return a negative result if a truthy boolean was passed.', () => {
		expect(isFunction(true)).to.equal(false);
	});

	it('should return a negative result if a falsy boolean was passed.', () => {
		expect(isFunction(false)).to.equal(false);
	});

	it('should return a negative result if the passed value is a string.', () => {
		expect(isFunction('test')).to.equal(false);
	});

	it('should return a negative result if the passed value is a number.', () => {
		expect(isFunction(2)).to.equal(false);
	});

	it('should return a negative result if the passed value is an object.', () => {
		expect(isFunction({})).to.equal(false);
	});

	it('should return a positive result if the passed value is a function.', () => {
		expect(isFunction(() => null)).to.equal(true);
	});
});
