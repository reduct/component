import {expect} from 'chai';
import {isObject} from './isObject.js';

describe('@reduct/component: utilities.isObject', () => {
	it('should return a negative result if no value was passed.', () => {
		expect(isObject()).to.equal(false);
	});

	it('should return a negative result if "null" was passed.', () => {
		expect(isObject(null)).to.equal(false);
	});

	it('should return a negative result if a truthy boolean was passed.', () => {
		expect(isObject(true)).to.equal(false);
	});

	it('should return a negative result if a falsy boolean was passed.', () => {
		expect(isObject(false)).to.equal(false);
	});

	it('should return a negative result if the passed value is a string.', () => {
		expect(isObject('test')).to.equal(false);
	});

	it('should return a negative result if the passed value is a function.', () => {
		expect(isObject(() => null)).to.equal(false);
	});

	it('should return a negative result if the passed value is a number.', () => {
		expect(isObject(2)).to.equal(false);
	});

	it('should return a positive result if the passed value is an object.', () => {
		expect(isObject({})).to.equal(true);
	});
});
