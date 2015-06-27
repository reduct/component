jest.dontMock('./../../../Dist/NodeProto.js');

var propType;

beforeEach(function() {
    var nodeProto = require('./../../../Dist/NodeProto.js');
    propType = nodeProto.propTypes.isNumber.isOptional;
});

describe('NodeProto: propTypes.isNumber.isOptional', function () {
    it('should be defined', function () {
        expect(propType).toBeDefined();
    });

    it('should return an object containing a result and value when called.', function () {
        // ToDo: Re-Enable as soon as the returned result value is undefined when no argument was passed.
        //expect(propType()).toEqual({
        //    result: true,
        //    value: NaN
        //});
    });

    it('should return an positive result with no arguments passed.', function () {
        expect(propType().result).toBeTruthy();
    });

    it('should return an negative result if the argument which was passed isNaN.', function () {
        expect(propType('Prop').result).toBeFalsy();
    });

    it('should return an positive result if the argument which was passed is a Number.', function () {
        expect(propType(0).result).toBeTruthy();
    });

    it('should return an positive result if the argument which was passed is a String but contains a Number.', function () {
        expect(propType('0').result).toBeTruthy();
    });

    it('should return the passed argument as the returning value', function () {
        expect(propType(0).value).toBe(0);
    });

    it('should return a Number as the returning value if the passed argument is a String but Contains a Number', function () {
        expect(propType('0').value).toBe(0);
    });
});

afterEach(function() {
    propType = null;
});