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

    const propTypes = {
        isRequired: function(props, propName) {
            var isPropInProps = props[propName];

            if(!isPropInProps) {
                throw new Error('ComponentPrototype Error: The prop "' + propName + '" is required.');
            }

            return isPropInProps;
        },
        isOptional: function() {
            return true;
        },
    }

    const createClass = function(classObject) {
        'use strict';

        // Create an Constructor with all functions of the classObject inherited in the prototype.
        const BaseConstructor = _mixin(function() {}, classObject);

        // Support for additional passed in mixins.
        if(classObject.mixins && classObject.mixins.constructor === Array) {
            console.log('Yup, Additional Mixins');
        }

        // Convert the Constructor into an ES6 Class.
        class MixedMirrorClass extends BaseConstructor {}

        // Extend the mixedIn Class with the base functionality.
        class ComponentPrototype extends MixedMirrorClass {
            constructor(element, props) {
                if(!element) {
                    throw new Error('ComponentPrototype Error: No element was specified while creating a new Class.');
                }
                if(!props) {
                    throw new Error('ComponentPrototype Error: No props where specified while creating a new Class.');
                }

                this.props = {};
                this.el = element;

                this.validateProps(props);
            }
            validateProps(props) {
                for (let propName in classObject.propTypes) {
                    let propValidator = classObject.propTypes[propName];
                    let hasPropPassedValidator = propValidator(props, propName);

                    if(hasPropPassedValidator) {
                        this.setProp(propName, props[propName]);
                    }
                }
            }
            getElement() {
                return this.el;
            }
            setProp(propName, propKey) {
                this.props[propName] = propKey;
            }
            getProp(propName) {
                return this.props[propName];
            }
        }

        // Return the Class.
        return ComponentPrototype;
    }

    const _mixin = function(arg1, arg2) {
        let isFirstArgumentConstructor = _isFunction(arg1);
        let Constructor = isFirstArgumentConstructor ? arg1 : this;
        let mixinObject = isFirstArgumentConstructor ? arg2 : arg1;

        // Mix in each function into the Constructors prototype.
        for (let mixinFunctionName in mixinObject) {
            const mixinFunction = mixinObject[mixinFunctionName];

            if(_isFunction(mixinFunction)) {
                Constructor.prototype[mixinFunctionName] = mixinFunction;
            }
        }

        return Constructor;
    }

    const _isFunction = function(func) {
        return typeof(func) === 'function';
    }

    return {
        createClass: createClass,
        propTypes: propTypes
    };
}));