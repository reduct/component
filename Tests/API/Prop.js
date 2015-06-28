var nodeProto = require('./../../Src/NodeProto.js');
var Component = require('./../ExampleComponents/Default.js');

describe('NodeProto: Prop API', () => {
    it('should return undefined if no prop was set.', () => {
        let instance = new Component();

        expect(instance.getProp('myProp')).toBeUndefined();
    });

    it('should check if a prop is present.', () => {
        let instance = new Component();

        expect(instance.hasProp('myProp')).toBeFalsy();
    });

    it('should return the value of a state which was previously set.', () => {
        let instance = new Component();

        instance.setState('myState', 1);

        expect(instance.getState('myState')).toBe(1);
    });

    it('should validate and set the passed props when propTypes are given.', () => {
        let instance = new Component(null, {
            'props': {
                'myProp': 2
            },
            'propTypes': {
                'myProp': nodeProto.propTypes.isRequired
            }
        });

        expect(instance.getProp('myProp')).toBe(2);
    });

    it('should validate and set values of the elements dataset when propTypes are given.', () => {
        let element = document.createElement('div');
        let instance;

        element.setAttribute('data-myprop', 'value');

        instance = new Component(element, {
            'propTypes': {
                'myProp': nodeProto.propTypes.isRequired
            }
        });

        expect(instance.getProp('myProp')).toBe('value');
    });

    it('should fall back to the getDefaultProps method when propTypes are given but the prop wasn‘t found in either the passed props or the dataset.', () => {
        let instance;

        instance = new Component(null, {
            'propTypes': {
                'anotherProp': nodeProto.propTypes.isRequired
            }
        });

        expect(instance.getProp('anotherProp')).toBe(2);
    });
});