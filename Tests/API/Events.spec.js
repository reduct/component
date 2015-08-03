var buildTools = require('@reduct/build-tools');
var DefaultComponent = require('./../ExampleComponents/Dist/Default.js');
var chai = buildTools.chai;
var DOM = buildTools.mock;
var spies = buildTools.spies;
var expect = chai.expect;

chai.use(spies);

describe('@reduct/component: Events API', function () {
    var instance;
    var eventCallback;

    beforeEach(function before (done) {
        instance = new DefaultComponent();
        eventCallback = chai.spy(function (arg) { });

        return DOM.create(DOM.defaultMock, done);
    });

    it('should listen to the trigger event and execute the callback with the provided argument.', function () {

        instance.on('myEvent', eventCallback);
        instance.trigger('myEvent', 1);

        expect(eventCallback).to.have.been.called.with(1);
    });

    it('should remove the given function from the event queue.', function () {
        instance.on('myEvent', eventCallback);
        instance.off('myEvent', eventCallback);
        instance.trigger('myEvent', 1);

        expect(eventCallback).to.not.have.been.called.with(1);
    });

    afterEach(function () {
        instance = null;
        eventCallback = null;
    });
});