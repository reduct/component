/**
 * Deep-Clones a object.
 *
 * @param obj {Object} The object to clone.
 * @returns {Object} The cloned object.
 */
export function cloneObject(obj = {}) {
	const target = {};

	for (const i in obj) {
		if (obj.hasOwnProperty(i)) {
			target[i] = obj[i];
		}
	}

	return target;
}
