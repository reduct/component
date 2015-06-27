var nodeProto = require('./../../Src/NodeProto.js');

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

describe('NodeProto: Prop API', function () {
    it('should return undefined if no prop was set.', function () {
        let instance = new ExampleComponent();

        expect(instance.getProp('myProp')).toBeUndefined();
    });

    it('should check if a prop is present.', function () {
        let instance = new ExampleComponent();

        expect(instance.hasProp('myProp')).toBeFalsy();
    });

    it('should return the value of a state which was previously set.', function () {
        let instance = new ExampleComponent();

        instance.setState('myState', 1);

        expect(instance.getState('myState')).toBe(1);
    });

    it('should validate and set the passed props when propTypes are given.', function () {
        let instance = new ExampleComponent(null, {
            'myProp': 2
        }, {
            'myProp': nodeProto.propTypes.isRequired
        });

        expect(instance.getProp('myProp')).toBe(2);
    });

    it('should validate and set values of the elements dataset when propTypes are given.', function () {
        let element = document.createElement('div');
        let instance;

        element.setAttribute('data-myprop', 'value');

        instance = new ExampleComponent(element, null, {
            'myProp': nodeProto.propTypes.isRequired
        });

        expect(instance.getProp('myProp')).toBe('value');
    });

    it('should fall back to the getDefaultProps method when propTypes are given but the prop wasn‘t found in either the passed props or the dataset.', function () {
        let instance;

        instance = new ExampleComponent(null, null, {
            'anotherProp': nodeProto.propTypes.isRequired
        });

        expect(instance.getProp('anotherProp')).toBe(2);
    });
});