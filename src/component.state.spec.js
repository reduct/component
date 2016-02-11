import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Component from './component.js';

chai.should();
chai.use(sinonChai);

class DefaultComponent extends Component {
	constructor(el, props) {
		super(el, {
			props
		});
	}

	getInitialState() {
		return {
			myState: 1
		};
	}
}

class ComponentWithoutDefaults extends Component {
	constructor(el, props) {
		super(el, {
			props
		});
	}
}

describe('@reduct/component: State API', () => {
	let instance;

	beforeEach(() => {
		instance = new DefaultComponent();
	});

	it('should return undefined if no state was set.', () => {
		expect(instance.state.anotherState).to.be.an('undefined');
	});

	it('should return the value of a state which was previously set.', () => {
		instance.setState({
			myState: 2
		});

		expect(instance.state.myState).to.equal(2);
	});

	it('should fire an general change event if any state was set.', () => {
		const spy = sinon.spy();

		instance.on('change', spy);

		instance.setState({
			myState: 2
		});

		spy.should.have.been.calledWith({
			delta: {
				myState: 2
			},
			previousState: {
				myState: 1
			}
		});
	});

	it('should fire a specific change event if a state was set.', () => {
		const spy = sinon.spy();

		instance.on('change:myState', spy);

		instance.setState({
			myState: 2
		});

		spy.should.have.been.calledWith({
			key: 'myState',
			value: 2,
			previousValue: 1
		});
	});

	it('should not fire change events if the silent option is true.', () => {
		const spy = sinon.spy();

		instance.on('change:myState', spy);
		instance.on('change', spy);

		instance.setState({
			myState: 2
		}, {
			silent: true
		});

		spy.should.have.callCount(0);
	});

	it('should return the initial state if present.', () => {
		expect(instance.state.myState).to.equal(1);
	});

	it('should return an empty object if no getInitialState() method was present.', () => {
		const instanceWithoutDefaults = new ComponentWithoutDefaults();

		expect(instanceWithoutDefaults.getInitialState()).to.be.an('object');
	});

	it('should only set state diffs if each key was described in the getInitialState() method.', () => {
		const instanceWithoutDefaults = new ComponentWithoutDefaults();
		const fn = () => {
			instanceWithoutDefaults.setState({
				myState: 2
			});
		};

		expect(fn).to.throw(`@reduct/component Error: Please specify an initial value for 'myState' in your getInitialState() method of "ComponentWithoutDefaults".`);

		expect(instanceWithoutDefaults.state.myState).to.be.an('undefined');
	});

	afterEach(() => {
		instance = null;
	});
});
