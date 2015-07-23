var DefaultComponent = require('./../ExampleComponents/Default.js');

describe('@reduct/component: Element API', () => {
    it('should return a DOM element even if none was passed directly to the Constructor.', () => {
        var componentInstance = new DefaultComponent();

        expect(componentInstance.getElement()).toBeDefined();
    });
});