var Component = require('./../ExampleComponents/Default.js');

describe('NodeProto: Extend API', () => {
    it('should extend the instances prototype when given a mixin.', () => {
        let instance = new Component();
        const myFunction = jest.genMockFunction();

        instance.extend(instance, {
            'myFunction': myFunction
        });

        instance.myFunction();

        expect(myFunction).toBeCalled(myFunction);
    });
});