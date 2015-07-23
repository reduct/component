var DefaultComponent = require('./../ExampleComponents/Default.js');

describe('@reduct/component: Events API', () => {
    let instance;
    let eventCallback;

    beforeEach(() => {
        instance = new DefaultComponent();
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