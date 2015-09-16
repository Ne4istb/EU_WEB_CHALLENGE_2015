import Node from './node.js';

function getRootItem(data) {
	return data.filter(item => item.left === 1)[0];
}

function parseItem(item, data) {

	if (!item) {
		return null;
	}

	let descendants = [];

	let currentLeft = item.left;

	do {

		let currentItem = data.filter(x => x.left === currentLeft + 1)[0];

		var currentDescendant = parseItem(currentItem, data);

		if (currentDescendant) {
			descendants.push(currentDescendant);
			currentLeft = currentItem.right;
		}
	}
	while (currentDescendant);

	return new Node(item.name, descendants);
}

export function parse(data) {

	if (!data || !data.length || data.length === 0) {
		return null;
	}

	let rootItem = getRootItem(data);

	return parseItem(rootItem, data);
}
