import chai from 'chai';
import Component from './component.mocha-polyfill.js';
import utils from './utils/';

const expect = chai.expect;
const DOM = utils.DOM;

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
}

describe('@reduct/component: Find API', () => {
	beforeEach(done => DOM.create(DOM.defaultMock, done));

	it('should be capable of returning one child node of the component\'s root node', () => {
		const el = document.getElementById('MyComponent');
		const component = new DefaultComponent(el);
		const selector = '.foo';
		const node = component.find(selector);

		expect(node).to.not.be.an('undefined');
		expect(node.nodeName).to.not.be.an('undefined');

		// Call again in order to check that there is already only one cached item
		component.find(selector);
		expect(Object.keys(component.queryCache).length).to.equal(1);
	});

	it('should be capable of returning multiple child nodes of the component\'s root node', () => {
		const el = document.getElementById('MyComponent');
		const component = new DefaultComponent(el);
		const selector = '.foo';
		const nodes = component.findAll(selector);

		expect(nodes.length).to.equal(5);

		component.findAll(selector);
		expect(Object.keys(component.queryCache).length).to.equal(1);
	});
});
