/* ComponentPrototype 0.0.1 | @license ISC */

(function(global, factory) {
    'use strict';

    // If the env is browserify, export the factory using the module object.
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);

    // If the env is AMD, register the Module as 'componentprototype'.
    } else if (global.define && typeof global.define === "function" && global.define.amd) {
        global.define("componentprototype", [], function() {
            return factory(global);
        });

    // If the env is a browser(without CJS or AMD support), export the factory into the global window object.
    } else {
        global.componentPrototype = factory(global);
    }
}(window, function() {
    'use strict';

    const createClass = function(classObject) {
        // Create an Constructor with all functions of the classObject inherited in the prototype.
        let BaseClass = _createBaseClass(classObject);

        // Extend the mixedIn Class with the base functionality.
        class ComponentPrototype extends BaseClass {
            constructor(element, props) {
                if(!element) {
                    throw new Error('ComponentPrototype Error: No element was specified while creating a new Class.');
                }
                if(!props) {
                    throw new Error('ComponentPrototype Error: No props where specified while creating a new Class.');
                }

                this.props = {};
                this.states = {};
                this.el = element;

                this._validateAndSetProps(props, classObject.propTypes);
            }

            _validateAndSetProps(props, validators) {
                for (let validatorName in validators) {
                    const validator = validators[validatorName];
                    let hasPropPassedValidator = validator(props, validatorName);

                    if(hasPropPassedValidator) {
                        this._setProp(validatorName, props[validatorName]);
                    }
                }
            }

            getElement() {
                return this.el;
            }

            // Prop related methods.
            _setProp(propName, propVal) {
                this.props[propName] = propVal;
            }
            getProp(propName) {
                return this.props[propName];
            }
            hasProp(propName) {
                return _isDefinedInObject(this.props, propName);
            }
            getDefaultProps() {
                // ToDo: Create a getDefaultProps() method.
                return this.props;
            }

            // State related methods.
            setState(stateName, stateVal) {
                this.states[stateName] = stateVal;
            }
            getState(stateName) {
                return this.states[stateName];
            }
        }

        return ComponentPrototype;
    };

    const _createBaseClass = function(classObject) {
        // Create an Constructor with all functions of the classObject inherited in the prototype.
        let BaseConstructor = _mixin(function() {}, classObject);

        // Support for additional passed in mixins.
        if(classObject.mixins && classObject.mixins.constructor === Array) {
            classObject.mixins.forEach(function(mixin) {
                BaseConstructor = _mixin(BaseConstructor, mixin);
            });
        }

        // Convert the Constructor into an ES6 Class.
        class MixedMirrorClass extends BaseConstructor {}

        return MixedMirrorClass;
    };

    const _mixin = function(arg1, arg2) {
        const isFirstArgumentConstructor = _isFunction(arg1);
        let Constructor = isFirstArgumentConstructor ? arg1 : this;
        let mixinObject = isFirstArgumentConstructor ? arg2 : arg1;

        for (let mixinFunctionName in mixinObject) {
            const mixinFunction = mixinObject[mixinFunctionName];

            if(_isFunction(mixinFunction)) {
                Constructor.prototype[mixinFunctionName] = mixinFunction;
            }
        }

        return Constructor;
    };

    const _isFunction = function(func) {
        return typeof(func) === 'function';
    };

    const _isDefinedInObject = function(key, object) {
        return object[key] !== null;
    };

    const propTypes = {
        isRequired: function(props, propName) {
            var isPropInProps = _isDefinedInObject(propName, props);

            if(!isPropInProps) {
                throw new Error('ComponentPrototype Error: The prop "' + propName + '" is required.');
            }

            return isPropInProps;
        },
        isOptional: function(props, propName) {
            var isPropInProps = _isDefinedInObject(propName, props);

            if(!isPropInProps) {
                console.info('ComponentPrototype Info: The prop "' + propName + '" is optional and wasn`t found.');
            }

            return true;
        }
    };

    return {
        createClass: createClass,
        propTypes: propTypes
    };
}));