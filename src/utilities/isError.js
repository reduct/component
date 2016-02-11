/**
 * Checks if the given argument is an instance of the Error Object.
 *
 * @param val {*} The argument which will be validated.
 * @returns {boolean}
 *
 */
export function isError(val) {
	return val instanceof Error;
}
