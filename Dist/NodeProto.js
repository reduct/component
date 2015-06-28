/* NodeProto 1.0.2 | @license MIT */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
    "use strict";

    // If the env is browserify, export the factory using the module object.
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);

        // If the env is AMD, register the Module as 'componentprototype'.
    } else if (global.define && typeof global.define === "function" && global.define.amd) {
        global.define("nodeProto", [], function () {
            return factory(global);
        });

        // If the env is a browser(without CJS or AMD support), export the factory into the global window object.
    } else {
        global.nodeProto = factory(global);
    }
})(window, function (global) {
    "use strict";

    var doc = global.document;
    var isScriptExecutedByNode = process && process.title && process.title.indexOf("node") > -1;

    function _isFunction(func) {
        return typeof func === "function";
    }

    function _isNumeric(num) {
        return !isNaN(num);
    }

    function _isObject(obj) {
        return typeof obj === "object";
    }

    function _isDefined(val) {
        return val !== null && val !== undefined;
    }

    var propTypes = {
        isRequired: function isRequired(propValue, propName, el) {
            var isPropInProps = _isDefined(propValue);

            if (!isPropInProps) {
                logger.error("NodeProto Error: The prop \"" + propName + "\" is required and wasn‘t found on: ", el);
            }

            return {
                result: isPropInProps,
                value: propValue
            };
        },
        isOptional: function isOptional(propValue, propName, el) {
            var isPropInProps = _isDefined(propValue);

            if (!isPropInProps) {
                logger.info("NodeProto Info: The prop \"" + propName + "\" is optional and wasn‘t found on: ", el);
            }

            return {
                result: true,
                value: propValue
            };
        },
        isNumber: {
            isRequired: function isRequired(propValue, propName, el) {
                var isNumber = _isNumeric(propValue);
                var result = true;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(this, arguments);

                if (!isNumber) {
                    logger.error("NodeProto Error: The prop \"" + propName + "\" is not a number. ", el);
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
                    logger.error("NodeProto Error: The prop \"" + propName + "\" is not a number. ", el);
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
                var isObject = undefined;
                var result = true;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(this, arguments);

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch (e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if (!isObject) {
                    logger.error("NodeProto Error: The prop \"" + propName + "\" is not an valid JSON object. ", el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            },
            isOptional: function isOptional(propValue, propName, el) {
                var isObject = undefined;
                var result = true;
                var isPropValueDefined = _isDefined(propValue);

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch (e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if (isPropValueDefined && !isObject) {
                    logger.error("NodeProto Error: The prop \"" + propName + "\" is not an valid JSON object. ", el);
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
        log: function log(message) {
            if (isScriptExecutedByNode) {
                return;
            }

            try {
                console.log(message);
            } catch (e) {}
        },
        info: function info(message) {
            if (isScriptExecutedByNode) {
                return;
            }

            try {
                console.info(message);
            } catch (e) {}
        },
        warn: function warn(message) {
            if (isScriptExecutedByNode) {
                return;
            }

            try {
                console.warn(message);
            } catch (e) {}
        },
        error: function error(message) {
            if (isScriptExecutedByNode) {
                return;
            }

            try {
                console.error(message);
            } catch (e) {}
        }
    };

    var Component = (function () {
        function Component(element, opts) {
            _classCallCheck(this, Component);

            // Fail-Safe mechanism if someone is passing an array or the like as a second argument.
            opts = _isObject(opts) ? opts : {};

            if (!element) {
                logger.warn("NodeProto: No element was specified while creating a new Class. Creating a virtual DOM Element instead.");
            }

            this._passedProps = opts.props || {};
            this.props = {};
            this.states = {};
            this.observers = {};
            this.el = element || doc.createElement("div");

            this._validateAndSetProps(opts.propTypes);
            this._setInitialState();
        }

        _createClass(Component, [{
            key: "_validateAndSetProps",
            value: function _validateAndSetProps(propTypes) {
                var el = this.el;
                var _passedProps = this._passedProps;
                var _defaultProps = this.getDefaultProps();
                var defaultProps = _isObject(_defaultProps) ? _defaultProps : {};

                for (var propName in propTypes) {
                    var propValue = _passedProps[propName] || el.getAttribute("data-" + propName.toLowerCase()) || defaultProps[propName];
                    var validator = propTypes[propName];
                    var hasPropPassedValidator = validator(propValue, propName, el);

                    if (hasPropPassedValidator.result) {
                        this._setProp(propName, hasPropPassedValidator.value);
                    }
                }
            }
        }, {
            key: "_setInitialState",
            value: function _setInitialState() {
                var _initialStates = this.getInitialState();
                var initialStates = _isObject(_initialStates) ? _initialStates : {};

                for (var stateKey in initialStates) {
                    var value = initialStates[stateKey];

                    this.setState(stateKey, value);
                }
            }
        }, {
            key: "getElement",
            value: function getElement() {
                return this.el;
            }
        }, {
            key: "getDefaultProps",

            // Prop related methods.
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
        }, {
            key: "getInitialState",

            // State related methods.
            value: function getInitialState() {
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
        }, {
            key: "on",

            // Event System
            value: function on(event, listener) {
                return (this.observers[event] || (this.observers[event] = [])).push(listener);
            }
        }, {
            key: "trigger",

            // ToDo: Support for multiple arguments.
            value: function trigger(event, data) {
                var value = undefined;
                var key = undefined;

                for (value = this.observers[event], key = 0; value && key < value.length;) {
                    value[key++](data);
                }
            }
        }, {
            key: "off",
            value: function off(event, listener) {
                var value = undefined;
                var key = undefined;

                for (value = this.observers[event] || []; listener && (key = value.indexOf(listener)) > -1;) {
                    value.splice(key, 1);
                }

                this.observers[event] = listener ? value : [];
            }
        }, {
            key: "extend",
            value: function extend(instance, mixinObject) {
                for (var _name in mixinObject) {
                    var mixinFunction = mixinObject[_name];

                    if (_isFunction(mixinFunction)) {
                        // ToDo: __proto__ shouldn't be used, find a better way to mixin functionality into ES6 classes.
                        if (!instance.__proto__.hasOwnProperty(_name)) {
                            instance.__proto__[_name] = mixinFunction;
                        }
                    }
                }
            }
        }]);

        return Component;
    })();

    return {
        Component: Component,
        propTypes: propTypes
    };
});
