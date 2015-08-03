function factory (global, version) {
    var messages = {
        noElement: 'No element was specified while creating a instance of a Class. Creating a detached DOM Element instead.',
        extendDeprecate: '@reduct/component.extend() is deprecated since v1.0.7 - Use the native ES6 extend instead.'
    };

    /**
     * @private
     *
     * Checks if the given argument is a function.
     *
     * @param func {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isFunction (func) {
        return typeof func === 'function';
    }

    /**
     * @private
     *
     * Checks if the given argument is a Number.
     *
     * @param num {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isNumeric (num) {
        return !isNaN(num);
    }

    /**
     * @private
     *
     * Checks if the given argument is a boolean or a string containing a boolean.
     *
     * @param bol {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isBoolean (bol) {
        return typeof bol === 'boolean' || bol === 'true' || bol === 'false';
    }

    /**
     * @private
     *
     * Checks if the given argument is a object.
     *
     * @param obj {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isObject (obj) {
        return typeof obj === 'object';
    }

    /**
     * @private
     *
     * Checks if the given argument is a string.
     *
     * @param str {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isString (str) {
        return typeof str === 'string';
    }

    /**
     * @private
     *
     * Checks if the given argument is defined and not `null`.
     *
     * @param val {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isDefined (val) {
        return val !== null && val !== undefined;
    }

    const propTypes = {
        /**
         * Represents a general required check against a value.
         *
         * @param propValue {*} The value which will be validated.
         * @param propName {String} The name which will be logged in case of errors.
         * @param el {HTMLElement} The element on which the value was expected on.
         * @returns {{result: boolean, value: *}}
         *
         */
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

        /**
         * Represents a general optional check against a value.
         *
         * @param propValue {*} The value which will be validated.
         * @param propName{String} The name which will be logged in case of errors.
         * @param el {HTMLElement} The element on which the value was expected on.
         * @returns {{result: boolean, value: *}}
         *
         */
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
            /**
             * Extends the general required validator for the type `String`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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

            /**
             * Extends the general optional validator for the type `String`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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
            /**
             * Extends the general required validator for the type `Boolean`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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

            /**
             * Extends the general optional validator for the type `Boolean`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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
            /**
             * Extends the general required validator for the type `Number`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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

            /**
             * Extends the general optional validator for the type `Number`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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
            /**
             * Extends the general required validator for the type `Object`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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

            /**
             * Extends the general optional validator for the type `Object`.
             *
             * @param propValue {*} The value which will be validated.
             * @param propName {String} The name which will be logged in case of errors.
             * @param el {HTMLElement} The element on which the value was expected on.
             * @returns {{result: boolean, value: *}}
             *
             */
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
        _logLevel: 2,

        /**
         * Adjusts the noise of the logger.
         * 0 => No messages are displayed
         * 1 => Only severe messages are displayed
         * 2 => Every message is displayed
         *
         * @param int {Number} The new log level.
         * @returns {Void}
         *
         */
        setLogLevel: (int) => {
            logger._logLevel = _isNumeric(int) ? int : 2;
        },

        /**
         * Logs a message to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the log.
         * @returns {Void}
         *
         */
        log: (message, targetElement = '') => {
            if (logger._logLevel <= 2) {
                return;
            }

            try {
                console.log('@reduct/component: ' + message, targetElement);
            } catch (e) {}
        },

        /**
         * Logs a info to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the info.
         * @returns {Void}
         *
         */
        info: (message, targetElement = '') => {
            if (logger._logLevel <= 2) {
                return;
            }

            try {
                console.info('@reduct/component Info: ' + message, targetElement);
            } catch (e) {}
        },

        /**
         * Logs a warning to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the warning.
         * @returns {Void}
         *
         */
        warn: (message, targetElement = '') => {
            if (logger._logLevel <= 1) {
                return;
            }

            try {
                console.warn('@reduct/component Warning: ' + message, targetElement);
            } catch (e) {}
        },

        /**
         * Logs a error to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the error.
         * @returns {Void}
         *
         */
        error: (message, targetElement = '') => {
            if (logger._logLevel <= 0) {
                return;
            }

            try {
                // We still need the console.error call since the Error object can't print out references to HTML Elements.
                console.error(message, targetElement);
            } catch (e) {}

            throw new Error('@reduct/component Error: Details are posted above.');
        }
    };

    //
    // Reduce the logging noise for the unit tests.
    //
    if (process && process.title && !!~process.title.indexOf('reduct')) {
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

        /**
         * Returns the HTML Element on which the Component was mounted upon.
         *
         * @returns {HTMLElement}
         *
         */
        getElement() {
            return this.el;
        }

        /**
         * The default method which declares the default properties of the Component.
         *
         * @returns {Object} The object containing default props.
         *
         */
        getDefaultProps() {
            return {};
        }

        /**
         * @private
         *
         * Sets a property to the Component.
         *
         * @param propName {String} The name under which the value will be saved under.
         * @param propVal {*} The value of the property.
         *
         */
        _setProp(propName, propVal) {
            this.props[propName] = propVal;
        }

        /**
         * Returns the property for the given name.
         *
         * @param propName {String} The name of the property.
         * @returns {*} The value of the property.
         *
         */
        getProp(propName) {
            return this.props[propName];
        }

        /**
         * Returns a boolean regarding the existence of the property.
         *
         * @param propName {String} The name of the property.
         * @returns {boolean} The result of the check.
         *
         */
        hasProp(propName) {
            return _isDefined(this.props[propName]);
        }

        /**
         * The default method which declares the default state of the Component.
         *
         * @returns {Object} The object containing default state.
         *
         */
        getInitialStates() {
            return {};
        }

        /**
         * Sets a property to the Component.
         *
         * @param stateName {String} The name under which the value will be saved under.
         * @param stateVal {*} The value of the property.
         *
         */
        setState(stateName, stateVal) {
            this.states[stateName] = stateVal;
        }

        /**
         * Returns the property for the given name.
         *
         * @param stateName {String} The name of the property.
         * @returns {*} The value of the property.
         *
         */
        getState(stateName) {
            return this.states[stateName];
        }

        /**
         * Declares a event listener on the given event name.
         *
         * @param event {String} The name of the event under which the listener will be saved under.
         * @param listener {Function} The listener which will be executed once the event will be fired.
         * @returns {Number} The length of the event listener array.
         *
         */
        on(event, listener) {
            const targetArray = this.observers[event] || (this.observers[event] = []);

            return targetArray.push(listener);
        }

        /**
         * Triggers the event of the given name with optional data.
         *
         * @todo Support for multiple arguments.
         * @param event {String} The name of the event to trigger.
         * @param data {*} The data to pass to all listeners.
         *
         */
        trigger(event, data) {
            var value;
            var key;

            for (value = this.observers[event], key = 0; value && key < value.length;) {
                value[key++](data);
            }
        }

        /**
         * Removes the given listener function from the event of the given name.
         * @param event {String} Name of the event.
         * @param listener {Function} The listener function to remove.
         */
        off(event, listener) {
            var value;
            var key;

            for (value = this.observers[event] || []; listener && (key = value.indexOf(listener)) > -1;) {
                value.splice(key, 1);
            }

            this.observers[event] = listener ? value : [];
        }

        /**
         * Extends the Components prototype.
         *
         * @deprecated since version 1.1.0
         */
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
