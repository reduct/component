/* @reduct/component 1.0.6 | @license MIT */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory) {
    var version = {
        major: 1,
        minor: 0,
        patch: 6
    };
    var global;

    if (typeof window !== "undefined") {
        global = window;
    } else if (typeof global !== "undefined") {
        global = global;
    } else if (typeof self !== "undefined") {
        global = self;
    } else {
        global = this;
    }

    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(global, version);
    } else if (typeof define === "function" && define.amd) {
        define([], function () {
            return factory(global, version);
        });
    } else {
        global.reductAssembler = factory(global, version);
    }
})(function factory(global, version) {
    var _this = this,
        _arguments = arguments;

    var doc = global.document;
    var isScriptExecutedByNode = process && process.title && process.title.indexOf('node') > -1;
    var messages = {
        noElement: 'No element was specified while creating a instance of a Class. Creating a detached DOM Element instead.',
        extendDeprecate: '@reduct/component.extend() is deprecated since v1.0.7 - Use the native ES6 extend instead.'
    };

    function _isFunction(func) {
        return typeof func === 'function';
    }

    function _isNumeric(num) {
        return !isNaN(num);
    }

    function _isBoolean(bol) {
        return typeof bol === 'boolean' || bol === 'true' || bol === 'false';
    }

    function _isObject(obj) {
        return typeof obj === 'object';
    }

    function _isString(str) {
        return typeof str === 'string';
    }

    function _isDefined(val) {
        return val !== null && val !== undefined;
    }

    var propTypes = {
        isRequired: function isRequired(propValue, propName, el) {
            var isPropInProps = _isDefined(propValue);

            if (!isPropInProps) {
                logger.error('The prop "' + propName + '" is required and wasn‘t found on: ', el);
            }

            return {
                result: isPropInProps,
                value: propValue
            };
        },

        isOptional: function isOptional(propValue, propName, el) {
            var isPropInProps = _isDefined(propValue);

            if (!isPropInProps) {
                logger.info('The prop "' + propName + '" is optional and wasn‘t found on: ', el);
            }

            return {
                result: true,
                value: propValue
            };
        },

        isString: {
            isRequired: function isRequired(propValue, propName, el) {
                var isString = _isString(propValue);
                var result = true;

                propTypes.isRequired.apply(_this, _arguments);

                if (!isString) {
                    logger.error('The prop "' + propName + '" is not a string. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            },

            isOptional: function isOptional(propValue, propName, el) {
                var isString = _isString(propValue);
                var result = true;

                if (!isString) {
                    logger.error('The prop "' + propName + '" is not a string. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            }
        },

        isBoolean: {
            isRequired: function isRequired(propValue, propName, el) {
                var isBoolean = _isBoolean(propValue);
                var result = true;

                propTypes.isRequired.apply(_this, _arguments);

                if (!isBoolean) {
                    logger.error('The prop "' + propName + '" is not a boolean. ', el);
                    result = false;
                } else {
                    result = !!propValue;
                }

                return {
                    result: result,
                    value: propValue
                };
            },

            isOptional: function isOptional(propValue, propName, el) {
                var isBoolean = _isBoolean(propValue);
                var result = true;

                if (!isBoolean) {
                    logger.error('The prop "' + propName + '" is not a boolean. ', el);
                    result = false;
                } else {
                    result = !!propValue;
                }

                return {
                    result: result,
                    value: propValue
                };
            }
        },

        isNumber: {
            isRequired: function isRequired(propValue, propName, el) {
                var isNumber = _isNumeric(propValue);
                var result = true;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(_this, _arguments);

                if (!isNumber) {
                    logger.error('The prop "' + propName + '" is not a number. ', el);
                    result = false;
                } else {
                    propValue = Math.abs(propValue);
                }

                return {
                    result: result,
                    value: propValue
                };
            },

            isOptional: function isOptional(propValue, propName, el) {
                var isNumber = _isNumeric(propValue);
                var result = true;

                if (propValue && !isNumber) {
                    logger.error('The prop "' + propName + '" is not a number. ', el);
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
            isRequired: function isRequired(propValue, propName, el) {
                var result = true;
                var isObject = undefined;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(_this, _arguments);

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch (e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if (!isObject) {
                    logger.error('The prop "' + propName + '" is not an valid JSON object. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            },

            isOptional: function isOptional(propValue, propName, el) {
                var isPropValueDefined = _isDefined(propValue);
                var result = true;
                var isObject = undefined;

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch (e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if (isPropValueDefined && !isObject) {
                    logger.error('The prop "' + propName + '" is not an valid JSON object. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            }
        }
    };

    var logger = {
        // 2: Every message is displayed
        // 1: Only severe messages are displayed
        // 0: No messages are displayed
        _logLevel: 2,
        setLogLevel: function setLogLevel(int) {
            logger._logLevel = _isNumeric(int) ? int : 2;
        },

        log: function log(message) {
            var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (logger._logLevel <= 2) {
                return;
            }

            try {
                console.log('@reduct/component: ' + message, targetElement);
            } catch (e) {}
        },

        info: function info(message) {
            var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (logger._logLevel <= 2) {
                return;
            }

            try {
                console.info('@reduct/component Info: ' + message, targetElement);
            } catch (e) {}
        },

        warn: function warn(message) {
            var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (logger._logLevel <= 1) {
                return;
            }

            try {
                console.warn('@reduct/component Warning: ' + message, targetElement);
            } catch (e) {}
        },

        error: function error(message) {
            var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (logger._logLevel <= 0) {
                return;
            }

            try {
                console.error('@reduct/component Error: ' + message, targetElement);
            } catch (e) {}
        }
    };

    if (isScriptExecutedByNode) {
        logger.setLogLevel(0);
    }

    /**
     * Helper function to move passed props via constructor into the component
     * instance and validate them along the way
     *
     * @param {Component} component The component instance
     * @param {Object} propTypes A map of propTypes
     * @returns {Void}
     */
    function _validateAndSetProps(component, propTypes) {
        var el = component.el;
        var _passedProps = component._passedProps;
        var _defaultProps = component.getDefaultProps();
        var defaultProps = _isObject(_defaultProps) ? _defaultProps : {};

        for (var propName in propTypes) {
            var propValue = _passedProps[propName] || el.getAttribute('data-' + propName.toLowerCase()) || defaultProps[propName];
            var validator = propTypes[propName];
            var validatorResults = validator(propValue, propName, el);

            if (validatorResults.result) {
                component._setProp(propName, validatorResults.value);
            }
        }
    }

    /**
     * Helper function to set initial state variables in the component
     * instance
     *
     * @param {Component} component The component instance
     * @returns {Void}
     */
    function _setInitialStates(component) {
        var _initialStates = component.getInitialStates();
        var initialStates = _isObject(_initialStates) ? _initialStates : {};

        for (var stateKey in initialStates) {
            var value = initialStates[stateKey];

            component.setState(stateKey, value);
        }
    }

    var Component = (function () {
        function Component(element, opts) {
            _classCallCheck(this, Component);

            // Fail-Safe mechanism if someone is passing an array or the like as a second argument.
            opts = _isObject(opts) ? opts : {};

            if (!_isDefined(element)) {
                logger.warn(messages.noElement);
            }

            this._passedProps = opts.props || {};
            this.props = {};
            this.states = {};
            this.observers = {};
            this.el = element || doc.createElement('div');

            _validateAndSetProps(this, opts.propTypes);
            _setInitialStates(this);
        }

        _createClass(Component, [{
            key: "getElement",
            value: function getElement() {
                return this.el;
            }

            // Prop related methods.
        }, {
            key: "getDefaultProps",
            value: function getDefaultProps() {
                return {};
            }
        }, {
            key: "_setProp",
            value: function _setProp(propName, propVal) {
                this.props[propName] = propVal;
            }
        }, {
            key: "getProp",
            value: function getProp(propName) {
                return this.props[propName];
            }
        }, {
            key: "hasProp",
            value: function hasProp(propName) {
                return _isDefined(this.props[propName]);
            }

            // State related methods.
        }, {
            key: "getInitialStates",
            value: function getInitialStates() {
                return {};
            }
        }, {
            key: "setState",
            value: function setState(stateName, stateVal) {
                this.states[stateName] = stateVal;
            }
        }, {
            key: "getState",
            value: function getState(stateName) {
                return this.states[stateName];
            }

            // Event System
        }, {
            key: "on",
            value: function on(event, listener) {
                var targetArray = this.observers[event] || (this.observers[event] = []);

                return targetArray.push(listener);
            }

            // ToDo: Support for multiple arguments.
        }, {
            key: "trigger",
            value: function trigger(event, data) {
                var value;
                var key;

                for (value = this.observers[event], key = 0; value && key < value.length;) {
                    value[key++](data);
                }
            }
        }, {
            key: "off",
            value: function off(event, listener) {
                var value;
                var key;

                for (value = this.observers[event] || []; listener && (key = value.indexOf(listener)) > -1;) {
                    value.splice(key, 1);
                }

                this.observers[event] = listener ? value : [];
            }
        }, {
            key: "extend",
            value: function extend() {
                logger.error(messages.extendDeprecate);
            }
        }]);

        return Component;
    })();

    return {
        Component: Component,
        propTypes: propTypes,
        version: version
    };
});