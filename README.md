# NodeProto [![Build Status](https://travis-ci.org/Inkdpixels/NodeProto.svg)](https://travis-ci.org/Inkdpixels/NodeProto) [![Dependency Status](https://david-dm.org/Inkdpixels/NodeProto.svg)](https://david-dm.org/Inkdpixels/NodeProto) [![devDependency Status](https://david-dm.org/Inkdpixels/NodeProto/dev-status.svg)](https://david-dm.org/Inkdpixels/NodeProto#info=devDependencies) [![Code Climate](https://codeclimate.com/github/Inkdpixels/NodeProto/badges/gpa.svg)](https://codeclimate.com/github/Inkdpixels/NodeProto) [![Test Coverage](https://codeclimate.com/github/Inkdpixels/NodeProto/badges/coverage.svg)](https://codeclimate.com/github/Inkdpixels/NodeProto/coverage)

> A prototypical class that makes it easy to create Components with nodes, a powerfull instance configuration system and a react-like API.


## Key-Features
* Clean and simple react-like syntax (states, props, method names)
* ES6 Class support
* Clear listings of required props which will be passed in while initiating a new instance.
* 3-Way prop injection
 * Via the `arguments` array
 * The `dataset` of element if one was passed
 * Or the described `getDefaultProps()` method.
* If the props are accessed via the elements dataset, they will automatically be converted into the specified propType type(`String`, `Number` and even `Object`s via `JSON.parse()`)
* Simple `on`, `off` event observer pattern
* ~ 400 bytes minified
* No dependencies


## Install
With npm, use the familiar syntax e.g.:
```shell
npm install nodeproto --save
```

once the nodeproto package is installed, just require it in the main application file.
```js
var nodeProto = require("nodeproto");
```

This package also supports AMD/RequireJS, it is defined as `nodeProto`. Aren't using AMD/CommonJS? Just grab a [release](https://github.com/Inkdpixels/NodeProto/releases), include the `Dist/NodeProto.min.js` and access the loader via the following global:
```js
var nodeProto = window.nodeProto;
```

## Example
```js
// MyComponent.js
const myComponentPropTypes = {
  'myProp'              : nodeProto.propTypes.isRequired,
  'myPropNumber'        : nodeProto.propTypes.isNumber.isRequired,
  'myOptionalObjectProp': nodeProto.propTypes.isObject.isOptional
}

class MyComponent extends nodeProto.Component {
  constructor(el, props) {
    super(el, {
        'props': props,
        'propTypes': myComponentPropTypes
    });

    this.on('logSomething', this.doSomething.bind(this));
  }

  doSomething() {
    console.log(this.getProp('myProp'));
  }
}

 export default MyComponent;
```

```js
import MyComponent from 'MyComponent.js';

// Create a new instance, and pass in optional props.
const targetElement = document.querySelectorAll('[data-myComponent]')[0];
const instance = new MyComponent(targetElement, {
    'myProp': 'myString',
    'myPropNumber': 2
});

instance.trigger('logSomething') // LOG: 'myString'
```


## PropType validators
The PropType validators are a key feature of the NodeProto - They validate your props, and optionally transform the values into the requested types by the validator.

F.e. if your component expects a `Number` as a prop with the name `myProp`, and you can't pass in the prop directly via JS, you can create a dataset property with the given name on the target element with a `Number` as the value e.g. `data-myProp="2"`.

##### propTypes.isRequired
Will expect that the given key is present in either the passed Props-Object, the elements dataset or in the `getDefaultProps()` method.

##### propTypes.isOptional
Will log an info message into the UA's console if the given key is not present in either the passed Props-Object, the elements dataset or in the `getDefaultProps()` method.

##### propTypes.isNumber.isRequired
Like the basic `propTypes.isRequired` validator, but it also expects that the value is either a `Number`, or a `String` containing a `Number`.

##### propTypes.isNumber.isOptional
Like the basic `propTypes.isOptional` validator, but will also expect a `Number` as the value.

##### propTypes.isObject.isRequired
Like the basic `propTypes.isRequired` validator, but it also expects that the value is either a valid `Object`, or a `String` containing a JSON `Object`.

##### propTypes.isObject.isOptional
Like the basic `propTypes.isOptional` validator, but will also expect a `Object` as the value.


## Methods
#### instance.getElement();
Type: `Function`

Will retrieve the element on which the component was mounted upon, if no element was specified, a virtual DOM element will be created.

#### instance.getProp(key);
Type: `Function`
Argument `key`: `String`

Will retrieve the prop for the given key.

#### instance.hasProp(key);
Type: `Function`
Argument `key`: `String`

Will return a boolean regarding the existence of the prop for the given key.

#### instance.getDefaultProps();
Type: `Function`

Should return an object with all defaultProps you want to specify.

#### instance.setState(key, val);
Type: `Function`
Argument `key`: `String`
Argument `val`: `*`

Will set the given state of the component.

#### instance.getState(key);
Type: `Function`
Argument `key`: `String`

Will return the given state of the component.

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
