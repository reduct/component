jest.dontMock('./../../Dist/NodeProto.js');

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

    it('should return an positive result with no arguments passed.', function () {
        expect(propType().result).toBeTruthy();
    });
});

afterEach(function() {
    propType = null;
});