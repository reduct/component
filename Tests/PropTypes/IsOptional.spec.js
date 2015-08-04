var chai = require('@reduct/build-tools').chai;
var expect = chai.expect;
var propTypes = require('./../../Dist/Component.js').propTypes;
var propType = propTypes.isOptional;

describe('@reduct/component: propTypes.isOptional', function () {
    it('should be defined', function () {
        expect(propType).to.be.defined;
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).to.deep.equal({
            result: true,
            value: undefined
        });
    });

    it('should return a positive result with no arguments passed.', function () {
        expect(propType().result).to.be.true;
    });

    it('should return the passed argument as the returning value.', function () {
        expect(propType('Prop').value).to.equal('Prop');
    });
});
