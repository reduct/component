/* NodeProto 1.0.2 | @license MIT */

(function(global, factory) {
    'use strict';

    // If the env is browserify, export the factory using the module object.
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);

    // If the env is AMD, register the Module as 'componentprototype'.
    } else if (global.define && typeof global.define === "function" && global.define.amd) {
        global.define("nodeProto", [], function() {
            return factory(global);
        });

    // If the env is a browser(without CJS or AMD support), export the factory into the global window object.
    } else {
        global.nodeProto = factory(global);
    }
}(window, function(global) {
    'use strict';

    const doc = global.document;
    const isScriptExecutedByNode = process && process.title && process.title.indexOf('node') > -1;

    const _isFunction = function(func) {
        return typeof func === 'function';
    };

    const _isNumeric = function(num){
        return !isNaN(num);
    };

    const _isObject = function(obj){
        return typeof obj === 'object';
    };

    const _isDefined = function(val) {
        return val !== null && val !== undefined;
    };

    const propTypes = {
        isRequired: function(propValue, propName, el) {
            const isPropInProps = _isDefined(propValue);

            if(!isPropInProps) {
                logger.error('NodeProto Error: The prop "' + propName + '" is required and wasn‘t found on: ', el);
            }

            return {
                result: isPropInProps,
                value: propValue
            };
        },
        isOptional: function(propValue, propName, el) {
            const isPropInProps = _isDefined(propValue);

            if(!isPropInProps) {
                logger.info('NodeProto Info: The prop "' + propName + '" is optional and wasn‘t found on: ', el);
            }

            return {
                result: true,
                value: propValue
            };
        },
        isNumber: {
            isRequired: function(propValue, propName, el) {
                const isNumber = _isNumeric(propValue);
                let result = true;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(this, arguments);

                if(!isNumber) {
                    logger.error('NodeProto Error: The prop "' + propName + '" is not a number. ', el);
                    result = false;
                } else {
                    propValue = Math.abs(propValue);
                }

                return {
                    result: result,
                    value: propValue
                };
            },
            isOptional: function(propValue, propName, el) {
                const isNumber = _isNumeric(propValue);
                let result = true;

                if(propValue && !isNumber) {
                    logger.error('NodeProto Error: The prop "' + propName + '" is not a number. ', el);
                    result = false;
                }

                propValue = Math.abs(propValue);

                return {
                    result: result,
                    value: _isNumeric(propValue) ? propValue : undefined
                };
            }
        },
        isObject: {
            isRequired: function(propValue, propName, el) {
                let isObject;
                let result = true;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(this, arguments);

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch(e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if(!isObject) {
                    logger.error('NodeProto Error: The prop "' + propName + '" is not an valid JSON object. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            },
            isOptional: function(propValue, propName, el) {
                let isObject;
                let result = true;
                let isPropValueDefined = _isDefined(propValue);

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch(e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if(isPropValueDefined && !isObject) {
                    logger.error('NodeProto Error: The prop "' + propName + '" is not an valid JSON object. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            }
        }
    };

    const logger = {
        log: (message) => {
            if(isScriptExecutedByNode) {
                return;
            }

            try {
                console.log(message);
            } catch(e) {}
        },
        info: (message) => {
            if(isScriptExecutedByNode) {
                return;
            }

            try {
                console.info(message);
            } catch(e) {}
        },
        warn: (message) => {
            if(isScriptExecutedByNode) {
                return;
            }

            try {
                console.warn(message);
            } catch(e) {}
        },
        error: (message) => {
            if(isScriptExecutedByNode) {
                return;
            }

            try {
                console.error(message);
            } catch(e) {}
        }
    };

    class Component {
        constructor(element, opts) {
            // Fail-Safe mechanism if someone is passing an array or the like as a second argument.
            opts = _isObject(opts) ? opts : {};

            if(!element) {
                logger.warn('NodeProto: No element was specified while creating a new Class. Creating a virtual DOM Element instead.');
            }

            this._passedProps = opts.props || {};
            this.props = {};
            this.states = {};
            this.observers = {};
            this.el = element || doc.createElement('div');

            this._validateAndSetProps(opts.propTypes);
            this._setInitialState();
        }

        _validateAndSetProps(propTypes) {
            const el = this.el;
            const _passedProps = this._passedProps;
            const _defaultProps = this.getDefaultProps();
            const defaultProps = _isObject(_defaultProps) ? _defaultProps : {};

            for (let propName in propTypes) {
                const propValue = _passedProps[propName] || el.getAttribute('data-' + propName.toLowerCase()) || defaultProps[propName];
                const validator = propTypes[propName];
                const hasPropPassedValidator = validator(propValue, propName, el);

                if(hasPropPassedValidator.result) {
                    this._setProp(propName, hasPropPassedValidator.value);
                }
            }
        }

        _setInitialState() {
            const _initialStates = this.getInitialState();
            const initialStates = _isObject(_initialStates) ? _initialStates : {};

            for (let stateKey in initialStates) {
                const value = initialStates[stateKey]

                this.setState(stateKey, value);
            }
        }

        getElement() {
            return this.el;
        }

        // Prop related methods.
        getDefaultProps() {
            return {};
        }

        _setProp(propName, propVal) {
            this.props[propName] = propVal;
        }

        getProp(propName) {
            return this.props[propName];
        }

        hasProp(propName) {
            return _isDefined(this.props[propName]);
        }

        // State related methods.
        getInitialState() {
            return {};
        }

        setState(stateName, stateVal) {
            this.states[stateName] = stateVal;
        }

        getState(stateName) {
            return this.states[stateName];
        }

        // Event System
        on(event, listener) {
            return (this.observers[event] || (this.observers[event] = [])).push(listener);
        }

        // ToDo: Support for multiple arguments.
        trigger(event, data) {
            let value;
            let key;

            for (value = this.observers[event], key = 0; value && key < value.length;) {
                value[key++](data);
            }
        }

        off(event, listener) {
            let value;
            let key;

            for (value = this.observers[event] || []; listener && (key = value.indexOf(listener)) > -1;) {
                value.splice(key, 1);
            }

            this.observers[event] = listener ? value : [];
        }

        extend(instance, mixinObject) {
            for (let name in mixinObject) {
                let mixinFunction = mixinObject[name];

                if(_isFunction(mixinFunction)) {
                    // ToDo: __proto__ shouldn't be used, find a better way to mixin functionality into ES6 classes.
                    if (!instance.__proto__.hasOwnProperty(name)) {
                        instance.__proto__[name] = mixinFunction;
                    }
                }
            }
        }
    }

    return {
        Component: Component,
        propTypes: propTypes
    };
}));
