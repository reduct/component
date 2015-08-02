var chai = require('@reduct/build-tools').chai;
var DOM = require('./../Helpers/DOM');
var DefaultComponent = require('./../ExampleComponents/Dist/Default.js');
var ComponentWithoutDefaults = require('./../ExampleComponents/Dist/WithoutDefaults.js');
var expect = chai.expect;

describe('@reduct/component: State API', function () {
    var instance;

    beforeEach(function () {
        instance = new DefaultComponent();
    });

    it('should return undefined if no state was set.', function () {
        expect(instance.getState('myState')).to.be.undefined;
    });

    it('should return the value of a state which was previously set.', function () {
        instance.setState('myState', 1);

        expect(instance.getState('myState')).to.equal(1);
    });

    it('should return the initial state if present.', function () {
        expect(instance.getState('anotherState')).to.be.true;
    });

    it('should return an empty object if no getInitialStates() method was present.', function () {
        var instanceWithoutDefaults = new ComponentWithoutDefaults();

        expect(instanceWithoutDefaults.getInitialStates()).to.be.an('object');
    });

    afterEach(function () {
        instance = null;
    });
});