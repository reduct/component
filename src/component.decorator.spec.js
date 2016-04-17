import {expect} from 'chai';
import {DOM} from './test-utilities/';
import {component} from './component.mocha-polyfill.js';

@component()
class TestComponent {}

@component({
	testProp: (props, propName) => props[propName]
})
class TestComponentWithDefaults {
	getDefaultProps() {
		return {
			testProp: 'test'
		};
	}

	getInitialState() {
		return {
			testState: false
		};
	}
}

describe('@reduct/component: Decorator', () => {
	beforeEach(done => DOM.create(DOM.defaultMock, done));

	it('should extend the given target Class with the default behavior of the Component Class.', () => {
		const instance = new TestComponent();

		expect(instance.props).to.not.be.an('undefined');
		expect(instance.state).to.not.be.an('undefined');
		expect(instance.el).to.not.be.an('undefined');
	});

	it('should inherit the getDefaultProps() and getInitialState() methods of the given target Class.', () => {
		const instance = new TestComponentWithDefaults();

		expect(instance.props.testProp).to.equal('test');
		expect(instance.state.testState).to.equal(false);
	});

	it('should maintain the name of the given target Class as "_internalName".', () => {
		const instance = new TestComponentWithDefaults();

		expect(instance._internalName).to.equal('TestComponentWithDefaults');
	});
});
