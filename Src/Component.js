function factory (global, version) {
    const isScriptExecutedByNode = process && process.title && process.title.indexOf('node') > -1;
    var messages = {
        noElement: 'No element was specified while creating a instance of a Class. Creating a detached DOM Element instead.',
        extendDeprecate: '@reduct/component.extend() is deprecated since v1.0.7 - Use the native ES6 extend instead.'
    };

    function _isFunction (func) {
        return typeof func === 'function';
    }

    function _isNumeric (num) {
        return !isNaN(num);
    }

    function _isBoolean (bol) {
        return typeof bol === 'boolean' || bol === 'true' || bol === 'false';
    }

    function _isObject (obj) {
        return typeof obj === 'object';
    }

    function _isString (str) {
        return typeof str === 'string';
    }

    function _isDefined (val) {
        return val !== null && val !== undefined;
    }

    const propTypes = {
        isRequired: (propValue, propName, el) => {
            const isPropInProps = _isDefined(propValue);

            if (!isPropInProps) {
                logger.error('The prop "' + propName + '" is required and wasn‘t found on: ', el);
            }

            return {
                result: isPropInProps,
                value: propValue
            };
        },

        isOptional: (propValue, propName, el) => {
            const isPropInProps = _isDefined(propValue);

            if (!isPropInProps) {
                logger.info('The prop "' + propName + '" is optional and wasn‘t found on: ', el);
            }

            return {
                result: true,
                value: propValue
            };
        },

        isString: {
            isRequired: (propValue, propName, el) => {
                const isString = _isString(propValue);
                var result = true;

                propTypes.isRequired.apply(this, arguments);

                if (!isString) {
                    logger.error('The prop "' + propName + '" is not a string. ', el);
                    result = false;
                }

                return {
                    result: result,
                    value: propValue
                };
            },

            isOptional: (propValue, propName, el) => {
                const isString = _isString(propValue);
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
            isRequired: (propValue, propName, el) => {
                const isBoolean = _isBoolean(propValue);
                var result = true;

                propTypes.isRequired.apply(this, arguments);

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

            isOptional: (propValue, propName, el) => {
                const isBoolean = _isBoolean(propValue);
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
            isRequired: (propValue, propName, el) => {
                const isNumber = _isNumeric(propValue);
                var result = true;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(this, arguments);

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

            isOptional: (propValue, propName, el) => {
                const isNumber = _isNumeric(propValue);
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
            isRequired: (propValue, propName, el) => {
                var result = true;
                let isObject;

                // Since The prop is required, check for it's value beforehand.
                propTypes.isRequired.apply(this, arguments);

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

            isOptional: (propValue, propName, el) => {
                const isPropValueDefined = _isDefined(propValue);
                var result = true;
                let isObject;

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

    const logger = {
        // 2: Every message is displayed
        // 1: Only severe messages are displayed
        // 0: No messages are displayed
        _logLevel: 2,
        setLogLevel: (int) => {
            logger._logLevel = _isNumeric(int) ? int : 2;
        },

        log: (message, targetElement = '') => {
            if (logger._logLevel <= 2) {
                return;
            }

            try {
                console.log('@reduct/component: ' + message, targetElement);
            } catch (e) {}
        },

        info: (message, targetElement = '') => {
            if (logger._logLevel <= 2) {
                return;
            }

            try {
                console.info('@reduct/component Info: ' + message, targetElement);
            } catch (e) {}
        },

        warn: (message, targetElement = '') => {
            if (logger._logLevel <= 1) {
                return;
            }

            try {
                console.warn('@reduct/component Warning: ' + message, targetElement);
            } catch (e) {}
        },

        error: (message, targetElement = '') => {
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
    function _validateAndSetProps (component, propTypes) {
        const el = component.el;
        const _passedProps = component._passedProps;
        const _defaultProps = component.getDefaultProps();
        const defaultProps = _isObject(_defaultProps) ? _defaultProps : {};

        for (let propName in propTypes) {
            const propValue = _passedProps[propName] || el.getAttribute('data-' + propName.toLowerCase()) || defaultProps[propName];
            const validator = propTypes[propName];
            const validatorResults = validator(propValue, propName, el);

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
    function _setInitialStates (component) {
        const _initialStates = component.getInitialStates();
        const initialStates = _isObject(_initialStates) ? _initialStates : {};

        for (let stateKey in initialStates) {
            const value = initialStates[stateKey];

            component.setState(stateKey, value);
        }
    }

    class Component {
        constructor(element, opts) {
            // Fail-Safe mechanism if someone is passing an array or the like as a second argument.
            opts = _isObject(opts) ? opts : {};

            if (!_isDefined(element)) {
                logger.warn(messages.noElement);
            }

            this._passedProps = opts.props || {};
            this.props = {};
            this.states = {};
            this.observers = {};
            this.el = element || global.document.createElement('div');

            _validateAndSetProps(this, opts.propTypes);
            _setInitialStates(this);
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
        getInitialStates() {
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
            const targetArray = this.observers[event] || (this.observers[event] = []);

            return targetArray.push(listener);
        }

        // ToDo: Support for multiple arguments.
        trigger(event, data) {
            var value;
            var key;

            for (value = this.observers[event], key = 0; value && key < value.length;) {
                value[key++](data);
            }
        }

        off(event, listener) {
            var value;
            var key;

            for (value = this.observers[event] || []; listener && (key = value.indexOf(listener)) > -1;) {
                value.splice(key, 1);
            }

            this.observers[event] = listener ? value : [];
        }

        extend() {
            logger.error(messages.extendDeprecate);
        }
    }

    return {
        Component: Component,
        propTypes: propTypes,
        version: version
    };
}
