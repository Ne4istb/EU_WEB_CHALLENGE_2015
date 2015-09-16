import {parse} from '../../src/parser.js';
import Node from '../../src/node.js';

describe('Parser', () => {
	describe('parse() method', () => {

		it('should parse the data to a tree with only root node', () => {

			let data = [
				{ name: 'Test', left: 1, right: 2 }
			];

			let expected = new Node('Test', []);

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should parse the data to a tree with a root node and two descendants', () => {

			let data = [
				{ name: 'Test', left: 1, right: 6 },
				{ name: 'Item 1', left: 2, right: 3 },
				{ name: 'Item 2', left: 4, right: 5 }
			];

			let expected = new Node(
			'Test',
			[
				new Node('Item 1', []),
				new Node('Item 2', [])
			]
			);

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should parse the data to a tree with one descendant on each level', () => {

			let data = [
				{ name: 'Test', left: 1, right: 8 },
				{ name: 'Item 1', left: 2, right: 7 },
				{ name: 'Sub Item 1-1', left: 3, right: 6 },
				{ name: 'Sub Sub Item 1-1-1', left: 4, right: 5 }
			];

			let expected = new Node('Test', [
				new Node('Item 1', [
					new Node('Sub Item 1-1', [
						new Node('Sub Sub Item 1-1-1', [])
					])
				])
			]);

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should parse the data to a complex tree', () => {

			let data = [
				{ name: 'Test', left: 1, right: 24 },
				{ name: 'Item 1', left: 2, right: 7 },
				{ name: 'Sub Item 1-1', left: 3, right: 4 },
				{ name: 'Sub Item 1-2', left: 5, right: 6 },
				{ name: 'Item 2', left: 8, right: 15 },
				{ name: 'Sub Item 2-1', left: 9, right: 10 },
				{ name: 'Sub Item 2-2', left: 11, right: 12 },
				{ name: 'Sub Item 2-3', left: 13, right: 14 },
				{ name: 'Item 3', left: 16, right: 17 },
				{ name: 'Item 4', left: 18, right: 23 },
				{ name: 'Sub Item 4-1', left: 19, right: 22 },
				{ name: 'Sub Sub Item 4-1-1', left: 20, right: 21 }
			];

			let expected = new Node('Test', [
				new Node('Item 1', [
					new Node('Sub Item 1-1', []),
					new Node('Sub Item 1-2', [])
				]),
				new Node('Item 2', [
					new Node('Sub Item 2-1', []),
					new Node('Sub Item 2-2', []),
					new Node('Sub Item 2-3', [])
				]),
				new Node('Item 3', []),
				new Node('Item 4', [
					new Node('Sub Item 4-1', [
						new Node('Sub Sub Item 4-1-1', [])
					])
				])
			]);

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should parse the data to a complex tree (data has mixed item order)', () => {

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

			let expected = new Node('Test', [
				new Node('Item 1', [
					new Node('Sub Item 1-1', []),
					new Node('Sub Item 1-2', [])
				]),
				new Node('Item 2', [
					new Node('Sub Item 2-1', []),
					new Node('Sub Item 2-2', []),
					new Node('Sub Item 2-3', [])
				]),
				new Node('Item 3', []),
				new Node('Item 4', [
					new Node('Sub Item 4-1', [
						new Node('Sub Sub Item 4-1-1', [])
					])
				])
			]);

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should return null if there is no root element', () => {

			let data = [
				{ name: 'Item 1', left: 2, right: 3 },
				{ name: 'Item 2', left: 4, right: 5 }
			];

			let expected = null;

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should parse the real data to a correct node tree', () => {

			let data = [
				{ name: 'Cars', left: 1, right: 18 },
				{ name: 'Fast', left: 2, right: 11 },
				{ name: 'Red', left: 3, right: 6 },
				{ name: 'Ferrari', left: 4, right: 5 },
				{ name: 'Yellow', left: 7, right: 10 },
				{ name: 'Lamborghini', left: 8, right: 9 },
				{ name: 'Slow', left: 12, right: 17 },
				{ name: 'Lada', left: 13, right: 14 },
				{ name: 'Polonez', left: 15, right: 16 }
			];

			let expected = new Node('Cars', [
				new Node('Fast', [
					new Node('Red', [
						new Node('Ferrari', [])
					]),
					new Node('Yellow', [
						new Node('Lamborghini', [])
					])
				]),
				new Node('Slow', [
					new Node('Lada', []),
					new Node('Polonez', [])
				])
			]);

			expect(parse(data)).to.deep.equal(expected);

		});

		it('should parse an empty array to null', () => {

			let data = [];

			expect(parse(data)).to.deep.equal(null);
		});

		it('should parse undefined to null', () => {
			expect(parse()).to.deep.equal(null);
		});

	});

});
