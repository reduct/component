export const prototype = {
	extractFrom(Clazz) {
		const prototype = {};

		Reflect.ownKeys(Clazz.prototype).forEach(key => {
			if (key !== 'constructor') {
				prototype[key] = Clazz.prototype[key];
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
