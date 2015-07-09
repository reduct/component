var nodeProto = require('./../../../Src/NodeProto.js');

const propType = nodeProto.propTypes.isBoolean.isOptional;

describe('NodeProto: propTypes.isBoolean.isOptional', () => {
    it('should be defined', () => {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', () => {
        expect(propType()).toEqual({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed is not a boolean.', () => {
        expect(propType('truuuuuuuue').result).toBeFalsy();
    });

    it('should return a positive result if the argument which was passed is a boolean as string.', () => {
        expect(propType('true').result).toBeTruthy();
    });

    it('should return a positive result if the argument which was passed is a boolean as a boolean', () => {
        expect(propType(true).result).toBeTruthy();
    });
});
