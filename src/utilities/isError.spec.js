import {expect} from 'chai';
import {isError} from './isError.js';

describe('@reduct/component: utilities.isError', () => {
	it('should return a negative result if no value was passed.', () => {
		expect(isError()).to.equal(false);
	});

	it('should return a negative result if "null" was passed.', () => {
		expect(isError(null)).to.equal(false);
	});

	it('should return a negative result if a truthy boolean was passed.', () => {
		expect(isError(true)).to.equal(false);
	});

	it('should return a negative result if a falsy boolean was passed.', () => {
		expect(isError(false)).to.equal(false);
	});

	it('should return a negative result if the passed value is a string.', () => {
		expect(isError('test')).to.equal(false);
	});

	it('should return a negative result if the passed value is a number.', () => {
		expect(isError(2)).to.equal(false);
	});

	it('should return a negative result if the passed value is an object.', () => {
		expect(isError({})).to.equal(false);
	});

	it('should return a negative result if the passed value is a function.', () => {
		expect(isError(() => null)).to.equal(false);
	});

	it('should return a positive result if the passed value is an Error object.', () => {
		expect(isError(new Error('Geeeeronimooo'))).to.equal(true);
	});
});
