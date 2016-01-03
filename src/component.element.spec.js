import chai from 'chai';
import utils from './utils/';
import Component from './component.js';

const expect = chai.expect;
const DOM = utils.DOM;

class DefaultComponent extends Component {
	constructor(el, props) {
		super(el, props);
	}
}

describe('@reduct/component: Element API', () => {
	beforeEach(done => DOM.create(DOM.defaultMock, done));

	it('should return a DOM element even if none was passed directly to the Constructor.', () => {
		const componentInstance = new DefaultComponent();

		expect(componentInstance.getElement()).to.not.be.an('undefined');
	});
});
