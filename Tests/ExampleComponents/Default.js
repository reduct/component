var nodeProto = require('./../../Src/NodeProto.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends nodeProto.Component {
    constructor(el, opts) {
        super(el, opts);
    }

    getDefaultProps() {
        return {
            'anotherProp': 2
        }
    }

    getInitialStates() {
        return {
            'anotherState': true
        }
    }
}

module.exports = ExampleComponent;