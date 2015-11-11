import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {DOM} from './utils/';
import Component from './component.js';

chai.should();
chai.use(sinonChai);

class DefaultComponent extends Component {
	constructor(el, props) {
		super(el, props);
	}
}

describe('@reduct/component: Events API', () => {
	let instance;
	let spy;

	beforeEach(done => {
		instance = new DefaultComponent();
		spy = sinon.spy();

		return DOM.create(DOM.defaultMock, done);
	});

	it('should listen to the trigger event and execute the callback with the provided argument.', () => {
		instance.on('myEvent', spy);
		instance.trigger('myEvent', 1);

		spy.should.have.callCount(1);
		spy.should.have.been.calledWith(1);
	});

	it('should remove the given function from the event queue.', () => {
		instance.on('myEvent', spy);
		instance.off('myEvent', spy);
		instance.trigger('myEvent', 1);

		spy.should.have.callCount(0);
	});

	afterEach(() => {
		instance = null;
		spy = null;
	});
});
