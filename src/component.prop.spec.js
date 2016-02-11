import {expect} from 'chai';
import Component from './component.js';

const validator = (props, propName) => {
	const val = props[propName];
	const isPropInProps = val !== null && val !== undefined;

	if (!isPropInProps) {
		return new Error('Value is not defined.');
	}

	return val;
};

class DefaultComponent extends Component {
	getDefaultProps() {
		return {
			myProp: 1
		};
	}
}
DefaultComponent.propTypes = {
	myProp: validator
};

class ComponentWithoutDefaults extends Component {
	constructor(el, opts) {
		super(el, opts);
	}
}

describe('@reduct/component: Prop API', () => {
	it('should check if a prop is present.', () => {
		const instance = new ComponentWithoutDefaults();

		expect(instance.hasProp('nonExistentProp')).to.equal(false);
	});

	it('should throw an error if the getDefaultProps() method did not return a valid Object.', () => {
		class TestClass extends Component {
			constructor(el, opts) {
				super(el, opts);
			}

			getDefaultProps() {
				return null;
			}
		}
		const fn = () => new TestClass();

		expect(fn).to.throw();
	});

	it('should return an empty object if no getDefaultProps() method was specified in the extended Class.', () => {
		const instance = new ComponentWithoutDefaults();

		expect(instance.getDefaultProps()).to.be.an('object');
	});

	it('should throw an error if a propType was defined but was not passed in the initialization.', () => {
		class TestComponent extends Component {
			constructor(el, opts) {
				super(el, opts);
			}
		}
		TestComponent.propTypes = {
			myProp: validator
		};
		const fn = () => new TestComponent();

		expect(fn).to.throw('The propType for "myProp" in Component "TestComponent" returned an Error with the message:');
	});

	it('should validate and set the passed props when propTypes are given.', () => {
		const instance = new DefaultComponent(null, {
			myProp: 2
		});

		expect(instance.props.myProp).to.equal(2);
	});

	it('should validate and set values of the elements dataset when propTypes are given.', () => {
		const element = document.createElement('div');

		element.setAttribute('data-myprop', 'value');

		const instance = new DefaultComponent(element);

		expect(instance.props.myProp).to.equal('value');
	});

	it('should fall back to the getDefaultProps() method when propTypes are given but the prop wasn‘t found in either the passed props or the dataset.', () => {
		const instance = new DefaultComponent(null);

		expect(instance.props.myProp).to.equal(1);
	});

	it('should use the isOptional function automatically if an object which contains a isOptional function was passed as the propType.', () => {
		class TestComponent extends Component {
			constructor(el, opts) {
				super(el, opts);
			}
		}
		TestComponent.propTypes = {
			myProp: {
				isOptional: validator
			}
		};
		const instance = new TestComponent(null, {
			myProp: 2
		});

		expect(instance.props.myProp).to.equal(2);
	});

	it('should throw an error if a propType is not a function.', () => {
		class TestComponent extends Component {
			constructor(el, opts) {
				super(el, opts);
			}
		}
		TestComponent.propTypes = {
			myProp: 'nope'
		};
		const fn = () => new TestComponent();

		expect(fn).to.throw('Invalid propType "myProp" specified in Component "TestComponent". Please specify a function as the propType validator.');
	});
});
