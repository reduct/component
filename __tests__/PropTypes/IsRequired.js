jest.dontMock('./../../Dist/NodeProto.js');

var propType;

beforeEach(function() {
    var nodeProto = require('./../../Dist/NodeProto.js');
    propType = nodeProto.propTypes.isRequired;
});

describe('NodeProto: propTypes.isRequired', function () {
    it('should be defined', function () {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).toEqual({
            result: 0,
            value: undefined
        });
    });

    it('should return an positive result if an argument was passed.', function () {
        expect(propType('Prop').result).toBeTruthy();
    });

    it('should return an positive result even if the argument passed argument is "false".', function () {
        expect(propType(false).result).toBeTruthy();
    });

    it('should return the passed argument as the returning value', function () {
        expect(propType('Prop').value).toBe('Prop');
    });
});

afterEach(function() {
    propType = null;
});