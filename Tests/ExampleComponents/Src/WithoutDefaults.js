var component = require('./../../../Dist/Component.js');

// An ExampleClass without defaults
class ComponentWithoutDefaults extends component.Component {
    constructor(el, opts) {
        super(el, opts);
    }
}

module.exports = ComponentWithoutDefaults;