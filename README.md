# @reduct/component
[![Build Status](https://travis-ci.org/reduct/component.svg)](https://travis-ci.org/reduct/component) [![Dependency Status](https://david-dm.org/reduct/component.svg)](https://david-dm.org/reduct/component) [![devDependency Status](https://david-dm.org/reduct/component/dev-status.svg)](https://david-dm.org/reduct/component#info=devDependencies) [![Code Climate](https://codeclimate.com/github/reduct/component/badges/gpa.svg)](https://codeclimate.com/github/reduct/component) [![Test Coverage](https://codeclimate.com/github/reduct/component/badges/coverage.svg)](https://codeclimate.com/github/reduct/component/coverage)

> A prototypical class/decorator that makes it easy to create Components with nodes with a powerful instance configuration system and a react-like API.


## Features
* Clean and simple react-like syntax (state, props, method names)
* ES6 Class & Decorator support
* Support for propTypes(isRequired / isOptional / data types) which will be passed in while initiating a new instance.
* 3-Way prop value injection
 * Via the `arguments` array while creating a new instance.
 * The `dataset` of the element if one was passed to the instance.
 * Or the described `getDefaultProps()` method of your class.
* If the props are accessed via the elements dataset, they will automatically be converted into the specified propType type(`String`, `Number` and even `Object`s via `JSON.parse()`) - See [@reduct/nitpick](https://github.com/reduct/nitpick).
* Simple `on`, `off` event observer pattern
* ~ 11 kb when minified


## Install
```shell
npm install @reduct/component --save
```

once the component package is installed, just require it in your application file.
```js
import {component} from '@reduct/component';
```

or CommonJS:
```js
const reductComponent = require('@reduct/component');
```

This package also supports AMD/RequireJS. Aren't using AMD or CommonJS? Access the component via the following global:
```js
const component = window.reduct.Component;
```

The package depends on the `Relfect` API. We strongly recommend you to install and import the `babel-polyfill` package to conquer unwanted cross-browser problems.


### Example (ES6 Class with decorators)
*Note: If you are using babel and want to use the decorator syntax, install the `transform-decorators-legacy` plugin.*

```js
import {component} from '@reduct/component';
import propTypes from '@reduct/nitpick';

@component({
	//
	// Defines a required string prop
	//
	myProp: propTypes.string.isRequired

	//
	// Defines an optional string prop
	//
	optionalProp: propTypes.string
})
class TestComponent {
	constructor() {
		this.testMe();
	}

	testMe() {
		// Prints "My fancy prop..." into the UA's console.
		console.log(this.props.myProp);
	}
}
```


### Example (ES6 Class)
```js
import ComponentClass from '@reduct/component';
import propTypes from '@reduct/nitpick';

export class TestComponent extends ComponentClass {
	constructor(el, props) {
		super(el, props);

		this.testMe();
	}

	testMe() {
		// Prints "My fancy prop..." into the UA's console.
		console.log(this.props.myProp);
	}
}
TestComponent.propTypes = {
	myProp: propTypes.string.isRequired
};
```

### Instantiating a component.
```js
const node = document.querySelector('data-component="TestComponent"');
const instance = new TestComponent(node, {
	myProp: 'My fancy prop...'
});
```

## Using propTypes
In general you can use the propTypes of React, but reduct has it's own [propType package](https://github.com/reduct/nitpick) as well. You may ask why? There is one suitable difference between React's and Reduct's propTypes.

A reduct component is based upon DOM nodes, and the props are aggregated from the DOM node's dataset if no props where passed while initiating and no value was specified in the `getDefaultProps()` method. Using the DOM's dataset for prop values has a downside after all, no type safety. E.g. you can no longer expect that `data-myProp="2"` will be a valid `Number` since the every property of a DOM nodes dataset is a string. To bypass this issue, we recommend that your propType should convert the given value in case it is a string, for example, take a look at the [`propTypes.number` propType](https://github.com/reduct/nitpick/blob/master/src/number.js).

### Creating custom propTypes
As stated above, the structure of a propType is the same as with React's propTypes: A function which should return an Error object in case the validation has failed, the passed arguments are `props`, `propName` and `componentName`. From there on, you should validate the given props object or the targeted prop.

```js
export function myCustomPropType(props, propName, componentName) {
	if (props[propName] !== 'myRequiredValue') {
		return new Error(`Expected value of "${propName}" to match "myRequiredValue" but instead got "${props[propName]}".`);
	}
}
```

For reference, take a look at the default propTypes of [@reduct/nitpick](https://github.com/reduct/nitpick).

### My prop does not get passed into the component
Make sure to define a propType for the given property. We force the usage of propTypes since it is a best-practice anyway and we cannot anticipate props which are only defined on the DOM node.

### Retrieving state / props
You can access the instance props / state e.g.:
```js
const {myProp} = this.props;
const {myStateKey} = this.state;
```


## Component API
#### instance.getElement();
Type: `Function`

Will retrieve the element on which the component was mounted upon, if no element was specified, a detached DOM element will be created.

#### instance.find('selector');
Type: `Function`

Will return one child DOM node matching the given selector.

#### instance.findAll('selector');
Type: `Function`

Will return an array with child DOM nodes matching the given selector.

#### instance.hasProp(key);
Type: `Function`
Argument `key`: `String`

Will return a boolean regarding the existence of the prop for the given key.

#### instance.getDefaultProps();
Type: `Function`

Should return an object with all default props you want to set.

#### instance.setState(delta, opts);
Type: `Function`
Argument `delta`: `Object`
Argument `opts`: `Object` (Optional)

Will set the given state of the component. All passed keys should be specified in the `getInitialState()` method.
By default, the component will fire specific change events for each changed state key.
For example if you call `this.setState({ myKey: 1 })` the component will fire `change:myKey` as well as a general `change` event.
If a `opts` Object with the option `silent: true` was passed, the component won't fire any change events.

#### instance.getInitialState();
Type: `Function`

Should return an object representing the initial state of the component.

#### instance.on(eventName, listener);
Type: `Function`
Argument `eventName`: `String`
Argument `listener`: `Function`

Creates/Uses an event and attaches a callback to the given eventName.

#### instance.trigger(eventName, args);
Type: `Function`
Argument `eventName`: `String`
Argument `args`: `*`

Triggers an event and executes all functions for the given eventName with the passed argument.

#### instance.off(eventName, listener);
Type: `Function`
Argument `eventName`: `String`
Argument `listener`: `Function`

Removes the given listener from the event queue.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.


## License
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
