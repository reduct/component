var nodeProto = require('./../../../Src/NodeProto.js');

const propType = nodeProto.propTypes.isString.isRequired;

describe('NodeProto: propTypes.isString.isRequired', () => {
    it('should be defined', () => {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', () => {
        expect(propType()).toEqual({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result with no arguments passed.', () => {
        expect(propType().result).toBeFalsy();
    });

    it('should return a negative result if the argument which was passed is not a string.', () => {
        expect(propType(123).result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a string.', () => {
        expect(propType('foobar').result).toBeTruthy();
    });
});
