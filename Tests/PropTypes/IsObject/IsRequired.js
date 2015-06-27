import nodeProto from './../../../Src/NodeProto.js';

const propType = nodeProto.propTypes.isObject.isRequired;

describe('NodeProto: propTypes.isObject.isRequired', () => {
    it('should be defined', () => {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', () => {
        expect(propType()).toEqual({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed is not an Object.', () => {
        expect(propType('Prop').result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is an Object.', () => {
        expect(propType({}).result).toBeTruthy();
    });

    it('should return a positive result if the argument which was passed is a String but contains a JSON Object.', () => {
        expect(propType('{ "key": "value" }').result).toBeTruthy();
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
