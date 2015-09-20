import {fetchData} from './databaseService';
import {parse, validate} from './parser';

function fillTextArea(data) {
    document.getElementById('data').value = JSON.stringify(data);
    return data;
}

function clearErrors() {
    document.getElementById('error').textContent = '';
}


function removeChildren(node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

function clearSvg() {
    let svg = document.getElementById('tree');
    removeChildren(svg);
}

function getDataFromTextArea() {

    let valueStr = document.getElementById('data').value;

    try {
        var value = JSON.parse(valueStr);
    }
    catch (error) {
        throw onError('CannotParseInput');
    }

    return Promise.resolve(value);
}

let currentTree;

function storeTree(tree) {
    currentTree = tree;
    return tree;
}

function draw(tree) {

    let svg = document.getElementById('tree');
    let width = window.innerWidth;

    svg.appendChild(tree.toSvg(width, 0, 10, reDraw));
}

function reDraw() {
    clearSvg();
    draw(currentTree);
}

function onError(error) {

    let errorMessage;

    switch (error) {
        case 'CannotParseInput':
            errorMessage = 'Cannot parse input. Make sure you entered correct JSON.';
            break;
        case 'EmptyArray':
            errorMessage = 'The array is empty.';
            break;
        case 'NotArray':
            errorMessage = 'Input is not an array.';
            break;
        case 'NoRoot':
            errorMessage = 'There is no root node in the data structure.';
            break;
        case 'InconsistentData':
            errorMessage = 'The input data is inconsistent. Make sure all items has "name", "left" and "right" properties';
            break;
        case 'WrongRecordsAmount':
            errorMessage = 'The number of items does not meet an expected number specified in the root node.';
            break;
        case 'NonConsecutiveData':
            errorMessage = 'Data is not consecutive. Check if all "left" and "right" properties have correct values.';
            break;
        default:
            errorMessage = 'Unknown error';
    }

    document.getElementById('error').textContent = errorMessage;
}

function processData() {

    clearErrors();
    clearSvg();

    getDataFromTextArea()
    .then(validate)
    .then(parse)
    .then(storeTree)
    .then(draw)
    .catch(onError);
}

function init() {

    document.getElementById('processBtn').onclick = processData;

    fetchData()
    .then(fillTextArea)
    .then(validate)
    .then(parse)
    .then(storeTree)
    .then(draw)
    .catch(onError);
}

init();
