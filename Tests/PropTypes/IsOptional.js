var nodeProto = require('./../../Src/NodeProto.js');

const propType = nodeProto.propTypes.isOptional;

describe('NodeProto: propTypes.isOptional', () => {
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

    it('should return the passed argument as the returning value.', () => {
        expect(propType('Prop').value).toBe('Prop');
    });
});
