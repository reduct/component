var Component = require('./../ExampleComponents/Default.js');

describe('NodeProto: Element API', () => {
    it('should return a DOM element even if none was passed directly to the Constructor.', () => {
        var componentInstance = new Component();

        expect(componentInstance.getElement()).toBeDefined();
    });
});