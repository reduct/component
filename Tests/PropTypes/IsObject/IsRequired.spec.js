var chai = require('@reduct/build-tools').chai;
var expect = chai.expect;
var propTypes = require('./../../../Dist/Component.js').propTypes;
var propType = propTypes.isObject.isRequired;

describe('@reduct/component: propTypes.isObject.isRequired', function () {
    it('should be defined', function () {
        expect(propType).to.be.defined;
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).to.deep.equal({
            result: false,
            value: undefined
        });
    });

    it('should return a negative result if the argument which was passed is not an Object.', function () {
        expect(propType('Prop').result).to.be.false;
    });

    it('should return a positive result if the argument which was passed is an Object.', function () {
        expect(propType({}).result).to.be.true;
    });

    it('should return a positive result if the argument which was passed is a String but contains a JSON Object.', function () {
        expect(propType('{ "key": "value" }').result).to.be.true;
    });

    it('should return the passed argument as the returning value.', function () {
        expect(propType({}).value).to.be.an('object');
    });

    it('should return a valid JSON Object as the returning value if the passed argument is a String but Contains a JSON Object.', function () {
        expect(propType('{ "key": "value" }').value).to.deep.equal({
            "key": "value"
        });
    });
});
