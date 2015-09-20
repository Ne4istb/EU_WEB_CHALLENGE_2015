import {validate} from '../../src/parser.js';

describe('Parser', () => {

	describe('validate() method', () => {

		it('should throw not array error', () => {
			let testFunction = () => validate("test");
			expect(testFunction).to.throw("NotArray");
		});

		it('should return data', () => {

			let data = [
				{ name: 'Sub Item 1-1', left: 3, right: 4 },
				{ name: 'Sub Item 2-3', left: 13, right: 14 },
				{ name: 'Sub Item 4-1', left: 19, right: 22 },
				{ name: 'Item 2', left: 8, right: 15 },
				{ name: 'Sub Item 2-1', left: 9, right: 10 },
				{ name: 'Sub Item 1-2', left: 5, right: 6 },
				{ name: 'Item 4', left: 18, right: 23 },
				{ name: 'Item 1', left: 2, right: 7 },
				{ name: 'Item 3', left: 16, right: 17 },
				{ name: 'Test', left: 1, right: 24 },
				{ name: 'Sub Item 2-2', left: 11, right: 12 },
				{ name: 'Sub Sub Item 4-1-1', left: 20, right: 21 }
			];

			let testFunction = () => validate(data);
			expect(testFunction()).to.equal(data);
		});

		it('should throw empty array error', () => {
			let data = [];
			let testFunction = () => validate(data);

			expect(testFunction).to.throw("EmptyArray");
		});

		it('should throw no root error', () => {
			let data = [
				{ name: 'Item 1', left: 2, right: 7 },
				{ name: 'Sub Item 1-1', left: 3, right: 6 },
				{ name: 'Sub Sub Item 1-1-1', left: 4, right: 5 }
			];
			let testFunction = () => validate(data);
			expect(testFunction).to.throw("NoRoot");
		});

		it('should throw inconsistent data error', () => {
			let data = [
				{ name: 'Test', left: 1, right: 8 },
				{ test: 'Sub Sub Item 1-1-1' }
			];
			let testFunction = () => validate(data);
			expect(testFunction).to.throw("InconsistentData");
		});

		it('should throw wrong records number error', () => {
			let data = [
				{ name: 'Test', left: 1, right: 10 },
				{ name: 'Item 1', left: 2, right: 7 },
				{ name: 'Sub Item 1-1', left: 3, right: 6 },
				{ name: 'Sub Sub Item 1-1-1', left: 4, right: 5 }
			];
			let testFunction = () => validate(data);
			expect(testFunction).to.throw("WrongRecordsAmount");
		});

		it('should throw non-consecutive error', () => {
			let data = [
				{ name: 'Test', left: 1, right: 8 },
				{ name: 'Item 1', left: 2, right: 7 },
				{ name: 'Sub Item 1-1', left: 3, right: 7 },
				{ name: 'Sub Sub Item 1-1-1', left: 4, right: 5 }
			];
			let testFunction = () => validate(data);
			expect(testFunction).to.throw("NonConsecutiveData");
		});
	});
});