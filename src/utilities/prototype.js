export const prototype = {
	extractFrom(Target) {
		const prototype = {};

		Reflect.ownKeys(Target.prototype).forEach(key => {
			if (key !== 'constructor') {
				prototype[key] = Target.prototype[key];
			}
		});

		return prototype;
	},
	injectInto(Target, prototype) {
		for (const key in prototype) {
			if (prototype.hasOwnProperty(key)) {
				Target.prototype[key] = prototype[key];
			}
		}
	}
};
