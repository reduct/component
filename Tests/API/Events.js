var nodeProto = require('./../../Src/NodeProto.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends nodeProto.Component {
    constructor(el, props) {
        super(el, props)
    }
}

describe('NodeProto: Events API', () => {
    let instance;
    let eventCallback;

    beforeEach(() => {
        instance = new ExampleComponent();
        eventCallback = jest.genMockFunction();
    });

    it('should listen to the trigger event and execute the callback with the provided argument.', () => {
        instance.on('myEvent', eventCallback);
        instance.trigger('myEvent', 1);

        expect(eventCallback).toBeCalledWith(1);
    });

    it('should remove the given function from the event queue.', () => {
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