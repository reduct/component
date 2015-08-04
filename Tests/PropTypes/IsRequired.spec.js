var chai = require('@reduct/build-tools').chai;
var expect = chai.expect;
var propTypes = require('./../../Dist/Component.js').propTypes;
var propType = propTypes.isRequired;

describe('@reduct/component: propTypes.isRequired', function () {
    it('should be defined', function () {
        expect(propType).to.be.defined;
    });

    it('should return an object containing a result and value when called.', function () {
        expect(propType()).to.deep.equal({
            result: false,
            value: undefined
        });
    });

    it('should return a positive result if an argument was passed.', function () {
        expect(propType('Prop').result).to.be.true;
    });

    it('should return a positive result even if the argument passed argument is "false".', function () {
        expect(propType(false).result).to.be.true;
    });

    it('should return the passed argument as the returning value.', function () {
        expect(propType('Prop').value).to.equal('Prop');
    });
});
