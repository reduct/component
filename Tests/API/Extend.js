var DefaultComponent = require('./../ExampleComponents/Default.js');

describe('@reduct/component: Extend API', () => {
    it('should extend the instances prototype when given a mixin.', () => {
        let instance = new DefaultComponent();
        const myFunction = jest.genMockFunction();

        instance.extend(instance, {
            'myFunction': myFunction
        });

        instance.myFunction();

        expect(myFunction).toBeCalled(myFunction);
    });
});