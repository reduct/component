var propType;

beforeEach(function() {
    var nodeProto = require('./../../Dist/NodeProto.js');
    propType = nodeProto.propTypes.isOptional;
});

describe('NodeProto: propTypes.isOptional', function () {
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

    it('should return the passed argument as the returning value', function () {
        expect(propType('Prop').value).toBe('Prop');
    });
});

afterEach(function() {
    propType = null;
});