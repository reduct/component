var component = require('./../../Src/Component.js');

const propType = component.propTypes.isRequired;

describe('@reduct/component: propTypes.isRequired', () => {
    it('should be defined', () => {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', () => {
        expect(propType()).toEqual({
            result: false,
            value: undefined
        });
    });

    it('should return a positive result if an argument was passed.', () => {
        expect(propType('Prop').result).toBeTruthy();
    });

    it('should return a positive result even if the argument passed argument is "false".', () => {
        expect(propType(false).result).toBeTruthy();
    });

    it('should return the passed argument as the returning value.', () => {
        expect(propType('Prop').value).toBe('Prop');
    });
});
