var nodeProto = require('./../Src/NodeProto.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends nodeProto.Component {
    constructor(el, props, propTypes) {
        super(el, props, propTypes)
    }

    getDefaultProps() {
        return {
            'anotherProp': 2
        }
    }
}

module.exports = ExampleComponent;