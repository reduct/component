var Component = require('./../ExampleComponents/Default.js');

describe('NodeProto: State API', () => {
    let instance;

    beforeEach(() => {
        instance = new Component();
    });

    it('should return undefined if no state was set.', () => {
        expect(instance.getState('myState')).toBeUndefined();
    });

    it('should return the value of a state which was previously set.', () => {
        instance.setState('myState', 1);

        expect(instance.getState('myState')).toBe(1);
    });

    it('should return the initial state if present.', () => {
        expect(instance.getState('anotherState')).toBe(true);
    });

    afterEach(() => {
        instance = null;
    });
});