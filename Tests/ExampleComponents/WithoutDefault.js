var nodeProto = require('./../../Src/NodeProto.js');

// An ExampleClass without defaults
class ComponentWithoutDefaults extends nodeProto.Component {
    constructor(el, opts) {
        super(el, opts);
    }
}

module.exports = ComponentWithoutDefaults;