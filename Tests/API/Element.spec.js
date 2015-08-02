var chai = require('@reduct/build-tools').chai;
var DOM = require('./../Helpers/DOM');
var DefaultComponent = require('./../ExampleComponents/Dist/Default.js');
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