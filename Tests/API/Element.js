var ExampleComponent = require('./../ExampleComponent.js');

describe('NodeProto: Element API', () => {
    it('should return a DOM element even if none was passed directly to the Constructor.', () => {
        var componentInstance = new ExampleComponent();

        expect(componentInstance.getElement()).toBeDefined();
    });
});