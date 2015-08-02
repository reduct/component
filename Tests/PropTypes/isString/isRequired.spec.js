var chai = require('@reduct/build-tools').chai;
var expect = chai.expect;
var propTypes = require('./../../../Dist/Component.js').propTypes;
var propType = propTypes.isString.isRequired;

describe('@reduct/component: propTypes.isString.isRequired', function () {
    it('should be defined', function () {
        expect(propType).to.be.defined;
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).to.deep.equal({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed is not a string.', function () {
        expect(propType(123).result).to.be.false;
    });

    it('should return a positive result if the argument which was passed is a string.', function () {
        expect(propType('foobar').result).to.be.true;
    });
});
