var chai = require('@reduct/build-tools').chai;
var expect = chai.expect;
var propTypes = require('./../../../Dist/Component.js').propTypes;
var propType = propTypes.isBoolean.isOptional;

describe('@reduct/component: propTypes.isBoolean.isOptional', function () {
    it('should be defined', function () {
        expect(propType).to.be.defined;
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).to.deep.equal({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed is not a boolean.', function () {
        expect(propType('truuuuuuuue').result).to.be.false;
    });

    it('should return a positive result if the argument which was passed is a boolean as string.', function () {
        expect(propType('true').result).to.be.true;
    });

    it('should return a positive result if the argument which was passed is a boolean as a boolean', function () {
        expect(propType(true).result).to.be.true;
    });
});
