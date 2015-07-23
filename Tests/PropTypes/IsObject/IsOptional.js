var component = require('./../../../Src/Component.js');

const propType = component.propTypes.isObject.isOptional;

describe('@reduct/component: propTypes.isObject.isOptional', () => {
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

    it('should return a negative result if the argument which was passed is a String and contains no JSON Object.', () => {
        expect(propType('Prop').result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a String and contains a JSON Object.', () => {
        expect(propType('{ "key": "value" }').result).toBeTruthy();
    });

    it('should return a negative result if the argument which was passed is a Number.', () => {
        expect(propType(0).result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is an Object.', () => {
        expect(propType({}).result).toBeTruthy();
    });

    it('should return the passed argument as the returning value.', () => {
        const value = {};

        expect(propType(value).value).toBe(value);
    });

    it('should return a valid JSON Object as the returning value if the passed argument is a String but Contains a JSON Object.', () => {
        expect(propType('{ "key": "value" }').value).toEqual({
            "key": "value"
        });
    });
});
