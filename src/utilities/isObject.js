/**
 * Checks if the given argument is a object.
 *
 * @param obj {*} The argument which will be validated.
 * @returns {boolean}
 *
 */
export function isObject(obj) {
	return (
		typeof obj === 'object' &&
		typeof obj !== 'function' &&
		obj !== null
	);
}
