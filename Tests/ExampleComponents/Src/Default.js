var component = require('./../../../Dist/Component.js');

// An ExampleClass for testing purposes.
class ExampleComponent extends component.Component {
    constructor(el, props) {
        super(el, props);

        //
        // Creating child nodes for testing the new find API
        //
        [1, 2, 3, 4, 5].map(() => {
            let node = document.createElement('div');

            this.el.appendChild(node);

            node.setAttribute('class', 'foo');

            return node;
        });
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

export default ExampleComponent;
