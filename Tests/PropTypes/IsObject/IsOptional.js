import nodeProto from './../../../Src/NodeProto.js';

const propType = nodeProto.propTypes.isObject.isOptional;

describe('NodeProto: propTypes.isObject.isOptional', function () {
    it('should be defined', function () {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).toEqual({
            result: true,
            value: undefined
        });
    });

    it('should return a positive result with no arguments passed.', function () {
        expect(propType().result).toBeTruthy();
    });

    it('should return a negative result if the argument which was passed is a String and contains no JSON Object.', function () {
        expect(propType('Prop').result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a String and contains a JSON Object.', function () {
        expect(propType('{ "key": "value" }').result).toBeTruthy();
    });

    it('should return a negative result if the argument which was passed is a Number.', function () {
        expect(propType(0).result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is an Object.', function () {
        expect(propType({}).result).toBeTruthy();
    });

    it('should return the passed argument as the returning value', function () {
        const value = {};

        expect(propType(value).value).toBe(value);
    });

    it('should return a valid JSON Object as the returning value if the passed argument is a String but Contains a JSON Object', function () {
        expect(propType('{ "key": "value" }').value).toEqual({
            "key": "value"
        });
    });
});
