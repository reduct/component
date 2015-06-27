import nodeProto from './../../../Dist/NodeProto.js';

const propType = nodeProto.propTypes.isNumber.isOptional;

describe('NodeProto: propTypes.isNumber.isOptional', function () {
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

    it('should return a negative result if the argument which was passed isNaN.', function () {
        expect(propType('Prop').result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a Number.', function () {
        expect(propType(0).result).toBeTruthy();
    });

    it('should return a positive result if the argument which was passed is a String but contains a Number.', function () {
        expect(propType('0').result).toBeTruthy();
    });

    it('should return the passed argument as the returning value', function () {
        expect(propType(0).value).toBe(0);
    });

    it('should return a Number as the returning value if the passed argument is a String but Contains a Number', function () {
        expect(propType('0').value).toBe(0);
    });
});
