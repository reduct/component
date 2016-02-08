/**
 * Checks if the given argument is defined and not `null`.
 *
 * @param val {*} The argument which will be validated.
 * @returns {boolean}
 *
 */
export function isDefined(val) {
	return val !== null && val !== undefined;
}
