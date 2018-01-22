import TreeParser from './TreeParser';
import PersonParser from './PersonParser';

class FamilyParser extends TreeParser {
	constructor(raw, family) {
		super();

		this.raw = raw;
		this.family = family;

		if (!this.isFamily()) {
			throw new Error(`${this.pointer} is not a Family`);
		}
	}

	isFamily() {
		return this.family.tag === 'FAM';
	}

	findPerson(pointer) {
		return this.raw.find(r => r.tag === 'INDI' && r.pointer === pointer);
	}

	get pointer() {
		return this.family.pointer;
	}

	get wedding() {
		const weddings = this.findTags(this.family.tree, 'MARR')[0];

		if (!weddings || weddings.length === 0) {
			return {};
		}

		const husbandPointer = this.findTags(this.family.tree, 'HUSB')[0].data;
		const husband = new PersonParser(this.raw, this.findPerson(husbandPointer));
		const wifePointer = this.findTags(this.family.tree, 'WIFE')[0].data;
		const wife = new PersonParser(this.raw, this.findPerson(wifePointer));

		return {
			pointer: this.pointer,
			...this.getPlaceDate(weddings.tree),
			husband: {
				pointer: husbandPointer,
				...husband.namePrefered,
			},
			wife: {
				pointer: wifePointer,
				...wife.namePrefered,
			},
		};
	}

	get children() {
		const children = this.findTags(this.family.tree, 'CHIL');

		if (!children || children.length === 0) {
			return [];
		}

		return children.map(child => ({
			pointer: child.data,
			...new PersonParser(this.raw, this.findPerson(child.data)).namePrefered,
		}));
	}

	get parents() {
		const result = [];
		const fatherPointer = this.findTags(this.family.tree, 'HUSB')[0] && this.findTags(this.family.tree, 'HUSB')[0].data;
		if (fatherPointer) {
			const father = new PersonParser(this.raw, this.findPerson(fatherPointer)).namePrefered;
			father.relation = 'father';
			father.pointer = fatherPointer;
			result.push(father);
		}

		const motherPointer = this.findTags(this.family.tree, 'WIFE')[0] && this.findTags(this.family.tree, 'WIFE')[0].data;
		if (motherPointer) {
			const mother = new PersonParser(this.raw, this.findPerson(motherPointer)).namePrefered;
			mother.relation = 'mother';
			mother.pointer = motherPointer;
			result.push(mother);
		}

		return result;
	}
}

export default FamilyParser;
