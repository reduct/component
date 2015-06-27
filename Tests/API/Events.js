var nodeProto = require('./../../Src/NodeProto.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends nodeProto.Component {
    constructor(el, props) {
        super(el, props)
    }
}

describe('NodeProto: Events API', function () {
    let instance;
    let eventCallback;

    beforeEach(() => {
        instance = new ExampleComponent();
        eventCallback = jest.genMockFunction();
    });

    it('should listen to the trigger event and execute the callback with the provided argument.', function () {
        instance.on('myEvent', eventCallback);
        instance.trigger('myEvent', 1);

        expect(eventCallback).toBeCalledWith(1);
    });

    it('should remove the given function from the event queue.', function () {
        instance.on('myEvent', eventCallback);
        instance.off('myEvent', eventCallback);
        instance.trigger('myEvent', 1);

        expect(eventCallback).not.toBeCalled();
    });

    afterEach(() => {
        instance = null;
        eventCallback = null;
    });
});