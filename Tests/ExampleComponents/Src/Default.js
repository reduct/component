var component = require('./../../../Dist/Component.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends component.Component {
    constructor(el, opts) {
        super(el, opts);
    }

    getDefaultProps() {
        return {
            'myProp': 1
        }
    }

    getInitialState() {
        return {
            'myState': 1
        }
    }
}

module.exports = ExampleComponent;
