var component = require('./../../../Src/Component.js');

const propType = component.propTypes.isString.isRequired;

describe('@reduct/component: propTypes.isString.isRequired', () => {
    it('should be defined', () => {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', () => {
        expect(propType()).toEqual({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed is not a string.', () => {
        expect(propType(123).result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a string.', () => {
        expect(propType('foobar').result).toBeTruthy();
    });
});
