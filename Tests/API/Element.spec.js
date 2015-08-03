var buildTools = require('@reduct/build-tools');
var DefaultComponent = require('./../ExampleComponents/Dist/Default.js');
var chai = buildTools.chai;
var DOM = buildTools.mock;
var expect = chai.expect;

describe('@reduct/component: Element API', function () {
    beforeEach(function before (done) {
        return DOM.create(DOM.defaultMock, done);
    });

    it('should return a DOM element even if none was passed directly to the Constructor.', function () {
        var componentInstance = new DefaultComponent();

        expect(componentInstance.getElement()).to.not.be.undefined;
    });
});