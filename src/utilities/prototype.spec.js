import {expect} from 'chai';
import {prototype} from './prototype.js';

const Target = function () {};

Target.prototype.myMethod = () => null;

describe('@reduct/component: utilities.prototype', () => {
	describe('extractFrom', () => {
		it('should return a copy of the prototype of the passed Function.', () => {
			const result = prototype.extractFrom(Target);

			expect(result).to.be.an('object');
			expect(result.myMethod).to.be.a('function');
		});
	});

	describe('injectInto', () => {
		it('should add the passed prototype object into the target constructors prototype.', () => {
			function InjectTaret() {}

			expect(InjectTaret.prototype.myMethod).to.be.an('undefined');

			const proto = prototype.extractFrom(Target);

			prototype.injectInto(InjectTaret, proto);

			expect(InjectTaret.prototype.myMethod).to.be.a('function');
		});
	});
});
