var component = require('./../../../Src/Component.js');

const propType = component.propTypes.isNumber.isOptional;

describe('@reduct/component: propTypes.isNumber.isOptional', () => {
    it('should be defined', () => {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', () => {
        expect(propType()).toEqual({
            result: true,
            value: undefined
        });
    });

    it('should return a positive result with no arguments passed.', () => {
        expect(propType().result).toBeTruthy();
    });

    it('should return a negative result if the argument which was passed isNaN.', () => {
        expect(propType('Prop').result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a Number.', () => {
        expect(propType(0).result).toBeTruthy();
    });

    it('should return a positive result if the argument which was passed is a String but contains a Number.', () => {
        expect(propType('0').result).toBeTruthy();
    });

    it('should return the passed argument as the returning value.', () => {
        expect(propType(0).value).toBe(0);
    });

    it('should return a Number as the returning value if the passed argument is a String but Contains a Number.', () => {
        expect(propType('0').value).toBe(0);
    });
});
