var nodeProto = require('./../../Src/NodeProto.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends nodeProto.Component {
    constructor(el, props) {
        super(el, props)
    }
}

describe('NodeProto: Element API', () => {
    it('should return a DOM element even if none was passed directly to the Constructor.', () => {
        var componentInstance = new ExampleComponent();

        expect(componentInstance.getElement()).toBeDefined();
    });
});