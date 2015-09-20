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

function assertArray(data) {
    if (!Array.isArray(data)) {
        throw 'NotArray';
    }
}

function assertEmptyArray(data) {
    if (data.length === 0) {
        throw 'EmptyArray';
    }
}

function assertDataConsistency(data) {
    data.forEach(item => {
        if (!item.name || !item.left || !item.right) {
            throw 'InconsistentData';
        }
    });
}

function assertRootNode(data) {
    let rootItem = getRootItem(data);
    if (!rootItem) {
        throw 'NoRoot';
    }
}

function assertRecordsAmount(data) {

    let rootItem = getRootItem(data);

    let expectedRecordsAmount = rootItem.right / 2;
    if (expectedRecordsAmount !== data.length) {
        throw 'WrongRecordsAmount';
    }
}

function assertDataConsecution(data) {

    let edgeIndexes = [];

    data.forEach(item => {
        edgeIndexes.push(item.left);
        edgeIndexes.push(item.right);
    });

    edgeIndexes.sort((a, b)=> {
        return a - b;
    });

    let rootItem = getRootItem(data);

    for (let i = 0; i < rootItem.right; i++) {
        if (edgeIndexes[i] !== i + 1) {
            throw 'NonConsecutiveData';
        }
    }
}

export function validate(data) {

    assertArray(data);
    assertEmptyArray(data);
    assertDataConsistency(data);
    assertRootNode(data);
    assertRecordsAmount(data);
    assertDataConsecution(data);

    return data;
}
