var component = require('./../../../Dist/Component.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends component.Component {
    constructor(el, opts) {
        super(el, opts);
    }

    getDefaultProps() {
        return {
            'anotherProp': 2
        }
    }

    getInitialState() {
        return {
            'anotherState': true
        }
    }
}

module.exports = ExampleComponent;
