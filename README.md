# @reduct/component
[![Build Status](https://travis-ci.org/reduct/component.svg)](https://travis-ci.org/reduct/component) [![Dependency Status](https://david-dm.org/reduct/component.svg)](https://david-dm.org/reduct/component) [![devDependency Status](https://david-dm.org/reduct/component/dev-status.svg)](https://david-dm.org/reduct/component#info=devDependencies) [![Code Climate](https://codeclimate.com/github/reduct/component/badges/gpa.svg)](https://codeclimate.com/github/reduct/component) [![Test Coverage](https://codeclimate.com/github/reduct/component/badges/coverage.svg)](https://codeclimate.com/github/reduct/component/coverage)

> A prototypical class that makes it easy to create Components with nodes with a powerfull instance configuration system and a react-like API.


## Features
* Clean and simple react-like syntax (states, props, method names)
* ES6 Class & Decorator support
* Support for propTypes(required / optional / type of prop) which will be passed in while initiating a new instance.
* 3-Way prop value injection
 * Via the `arguments` array while creating a new instance.
 * The `dataset` of the element if one was passed to the instance.
 * Or the described `getDefaultProps()` method of your class.
* If the props are accessed via the elements dataset, they will automatically be converted into the specified propType type(`String`, `Number` and even `Object`s via `JSON.parse()`)
* Simple `on`, `off` event observer pattern
* ~ 11 kb when minified


## Install
With npm, use the familiar syntax e.g.:
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

The package depends on the `Relfect` API. We recommend you to import the `babel-polyfill` package as a best practice to cover unwanted cross-browser problems.


## Example (Decorators)
*Note:
If you are using babel, install at least the `transform-decorators-legacy` plugin if you want to use the decorator syntax.
If you want to use the ES6 Class, we recommend you to install the `transform-class-properties` plugin.*

```js
import {component} from '@reduct/component';
import propTypes from '@reduct/nitpick';

@component({
    testProp: propTypes.isString.isRequired
})
class Test {
	constructor() {
		this.testMe();
	}

	testMe() {
		console.log(this.props.testProp);
	}
}
```


## Example (ES6 Class)
```js
import ComponentClass from '@reduct/component';
import propTypes from '@reduct/nitpick';

export class Test extends ComponentClass {
	static propTypes = {
		testProp: propTypes.isString.isRequired
	};

    constructor(el, props) {
		super(el, {
			props,
			propTypes: {
				testProp: propTypes.isString.isRequired
			}
		});

		this.testMe();
	}

	testMe() {
		console.log(this.props.testProp);
	}
}
```


## Creating custom propType validators
Any propType validator needs to be a function on which gets passed three arguments.
The arguments in correct order are `propValue` for the value which was passed while initiating a class, the `propName` of the prop to validate and the `el` which is the DOM element of the instance.

The validator should return an object which contains at least a `result` Boolean and the validated/transformed propValue.
`F -> {result: Boolean, value: 'propValue'}`

For reference, take a look at the default propTypes of [@reduct/nitpick](https://github.com/reduct/nitpick).

## API
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

#### instance.trigger(eventName, [arg1, arg2, ...]);
Type: `Function`
Argument `eventName`: `String`
Argument `args`: `*`

Triggers an event and executes all functions for the given eventName with the passed arguments.

#### instance.off(eventName, listener);
Type: `Function`
Argument `eventName`: `String`
Argument `listener`: `Function`

Removes the given listener from the event queue.


## Retrieving state / props
You can access the instance props / state e.g.:
```js
const {myProp} = this.props;
const {myStateKey} = this.state;
```


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
