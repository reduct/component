/* NodeProto 1.0.0 | @license MIT */

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
    var _isFunction = function _isFunction(func) {
        return typeof func === "function";
    };

    var _isNumeric = function _isNumeric(num) {
        return !isNaN(num);
    };

    var _isObject = function _isObject(obj) {
        return typeof obj === "object" && obj !== null;
    };

    var _isDefinedInObject = function _isDefinedInObject(key, object) {
        return object[key] !== null;
    };

    var propTypes = {
        isRequired: function isRequired(propValue, propName, el) {
            var isPropInProps = propValue !== null & propValue !== undefined;

            if (!isPropInProps) {
                console.error("ComponentPrototype Error: The prop \"" + propName + "\" is required and wasn‘t found on: ", el);
            }

            return {
                result: isPropInProps,
                value: propValue
            };
        },
        isOptional: function isOptional(propValue, propName, el) {
            var isPropInProps = propValue !== null;

            if (!isPropInProps) {
                console.info("ComponentPrototype Info: The prop \"" + propName + "\" is optional and wasn‘t found on: ", el);
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
                    console.error("ComponentPrototype Error: The prop \"" + propName + "\" is not a number. ", el);
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
                    console.error("ComponentPrototype Error: The prop \"" + propName + "\" is not a number. ", el);
                    result = false;
                }

                propValue = Math.abs(propValue);

                return {
                    result: result,
                    value: propValue
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
                    console.error("ComponentPrototype Error: The prop \"" + propName + "\" is not an valid JSON object. ", el);
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

                // If the passed Property is a string, convert it to a JSON object beforehand.
                try {
                    propValue = JSON.parse(propValue);
                } catch (e) {}

                // Verify the type of the value.
                isObject = _isObject(propValue);

                if (propValue && !isObject) {
                    console.error("ComponentPrototype Error: The prop \"" + propName + "\" is not an valid JSON object. ", el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            }
        }
    };

    var Component = (function () {
        function Component(element, props, propTypes) {
            _classCallCheck(this, Component);

            if (!element) {
                console.warning("ComponentPrototype: No element was specified while creating a new Class. Creating a virtual DOM Element instead.");
            }

            this._passedProps = props || {};
            this.props = {};
            this.states = {};
            this.observers = {};
            this.el = element || doc.createElement("div");

            this._validateAndSetProps(propTypes);
        }

        _createClass(Component, [{
            key: "_validateAndSetProps",
            value: function _validateAndSetProps(propTypes) {
                var el = this.el;
                var _passedProps = this._passedProps;
                var defaultProps = _isFunction(this.getDefaultProps) ? this.getDefaultProps() : {};

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
            key: "getElement",
            value: function getElement() {
                return this.el;
            }
        }, {
            key: "_setProp",

            // Prop related methods.
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
                return _isDefinedInObject(this.props, propName);
            }
        }, {
            key: "setState",

            // State related methods.
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
