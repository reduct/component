var chai = require('@reduct/build-tools').chai;
var spies = require('chai-spies');
var DOM = require('./../Helpers/DOM');
var DefaultComponent = require('./../ExampleComponents/Dist/Default.js');
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