import chai from 'chai';
import Component from './component.js';

const expect = chai.expect;

const validator = propValue => {
	const isPropInProps = propValue !== null && propValue !== undefined;

	return {
		result: isPropInProps,
		value: propValue
	};
};

class DefaultComponent extends Component {
	constructor(el, props) {
		super(el, props);

		//
		// Creating child nodes for testing the new find API
		//
		[0, 1, 2, 3, 4].forEach(() => {
			const node = document.createElement('div');

			this.el.appendChild(node);

			node.setAttribute('class', 'foo');
		});
	}

	getDefaultProps() {
		return {
			myProp: 1
		};
	}
}

class ComponentWithoutDefaults extends Component {
	constructor(el, opts) {
		super(el, opts);
	}
}

describe('@reduct/component: Prop API', () => {
	it('should return undefined if no prop was set.', () => {
		const instance = new DefaultComponent();

		expect(instance.getProp('myProp')).to.be.an('undefined');
	});

	it('should check if a prop is present.', () => {
		const instance = new DefaultComponent();

		expect(instance.hasProp('myProp')).to.equal(false);
	});

	it('should validate and set the passed props when propTypes are given.', () => {
		const instance = new DefaultComponent(null, {
			props: {
				myProp: 2
			},
			propTypes: {
				myProp: validator
			}
		});

		expect(instance.getProp('myProp')).to.equal(2);
	});

	it('should validate and set values of the elements dataset when propTypes are given.', () => {
		const element = document.createElement('div');
		let instance;

		element.setAttribute('data-myprop', 'value');

		instance = new DefaultComponent(element, {
			propTypes: {
				myProp: validator
			}
		});

		expect(instance.getProp('myProp')).to.equal('value');
	});

	it('should fall back to the getDefaultProps() method when propTypes are given but the prop wasn‘t found in either the passed props or the dataset.', () => {
		const instance = new DefaultComponent(null, {
			propTypes: {
				myProp: validator
			}
		});

		expect(instance.getProp('myProp')).to.equal(1);
	});

	it('should return an empty object if no getDefaultProps() method was present.', () => {
		const instanceWithoutDefaults = new ComponentWithoutDefaults();

		expect(instanceWithoutDefaults.getDefaultProps()).to.be.an('object');
	});
});
