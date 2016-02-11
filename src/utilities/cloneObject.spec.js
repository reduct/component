import {expect} from 'chai';
import {cloneObject} from './cloneObject.js';

describe('@reduct/component: utilities.cloneObject', () => {
	it('should return an object with no arguments called.', () => {
		expect(cloneObject()).to.be.an('object');
	});

	it('should return a copy object of the passed object.', () => {
		const input = {
			foo: 'bar',
			baz: 'foo'
		};
		const result = cloneObject(input);

		expect(result).to.have.all.keys(['foo', 'baz']);
		expect(result).to.not.equal(input);
	});
});
