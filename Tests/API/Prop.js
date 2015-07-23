var component = require('./../../Src/Component.js');
var DefaultComponent = require('./../ExampleComponents/Default.js');
var ComponentWithoutDefaults = require('./../ExampleComponents/WithoutDefaults.js');

describe('@reduct/component: Prop API', () => {
    it('should return undefined if no prop was set.', () => {
        let instance = new DefaultComponent();

        expect(instance.getProp('myProp')).toBeUndefined();
    });

    it('should check if a prop is present.', () => {
        let instance = new DefaultComponent();

        expect(instance.hasProp('myProp')).toBeFalsy();
    });

    it('should return the value of a state which was previously set.', () => {
        let instance = new DefaultComponent();

        instance.setState('myState', 1);

        expect(instance.getState('myState')).toBe(1);
    });

    it('should validate and set the passed props when propTypes are given.', () => {
        let instance = new DefaultComponent(null, {
            'props': {
                'myProp': 2
            },
            'propTypes': {
                'myProp': component.propTypes.isRequired
            }
        });

        expect(instance.getProp('myProp')).toBe(2);
    });

    it('should validate and set values of the elements dataset when propTypes are given.', () => {
        let element = document.createElement('div');
        let instance;

        element.setAttribute('data-myprop', 'value');

        instance = new DefaultComponent(element, {
            'propTypes': {
                'myProp': component.propTypes.isRequired
            }
        });

        expect(instance.getProp('myProp')).toBe('value');
    });

    it('should fall back to the getDefaultProps() method when propTypes are given but the prop wasn‘t found in either the passed props or the dataset.', () => {
        let instance;

        instance = new DefaultComponent(null, {
            'propTypes': {
                'anotherProp': component.propTypes.isRequired
            }
        });

        expect(instance.getProp('anotherProp')).toBe(2);
    });

    it('should return an empty object if no getDefaultProps() method was present.', () => {
        let instanceWithoutDefaults = new ComponentWithoutDefaults();

        expect(instanceWithoutDefaults.getDefaultProps()).toEqual({});
    });
});