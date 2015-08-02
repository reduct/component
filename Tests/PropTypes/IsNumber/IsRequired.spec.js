var chai = require('@reduct/build-tools').chai;
var expect = chai.expect;
var propTypes = require('./../../../Dist/Component.js').propTypes;
var propType = propTypes.isNumber.isRequired;

describe('@reduct/component: propTypes.isNumber.isRequired', function () {
    it('should be defined', function () {
        expect(propType).to.be.defined;
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).to.deep.equal({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed isNaN.', function () {
        expect(propType('Prop').result).to.be.false;
    });

    it('should return a positive result if the argument which was passed is a Number.', function () {
        expect(propType(0).result).to.be.true;
    });

    it('should return a positive result if the argument which was passed is a String but contains a Number.', function () {
        expect(propType('0').result).to.be.true;
    });

    it('should return the passed argument as the returning value.', function () {
        expect(propType(0).value).to.equal(0);
    });

    it('should return a Number as the returning value if the passed argument is a String but Contains a Number.', function () {
        expect(propType('0').value).to.equal(0);
    });
});
