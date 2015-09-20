class TreeNode {

    constructor(name, descendants) {

        this.name = name;
        this.descendants = descendants;
        this.hidden = false;

        this.xmlns = 'http://www.w3.org/2000/svg';
        this.xlinkns = 'http://www.w3.org/1999/xlink';

        this._nodeWidth = 100;
        this._nodeHeight = 50;
        this._verticalOffset = 150;
    }

    changeVisibility() {
        this.hidden = !this.hidden;
    }

    toSvg(groupWidth, translateX = 0, translateY = 0, onClickCallback) {

        let result = this._createGroup(translateX, translateY);

        var centerPointX = groupWidth / 2;

        let nodeGroup = this._createNodeGroup(this.name, centerPointX, this._nodeHeight, onClickCallback);

        if (this.descendants.length > 0) {

            let descendantWidth = groupWidth / this.descendants.length;

            this.descendants
            .filter(item => !item.hidden)
            .forEach((descendant, index)=> {

                let connectorSvg = this._createConnector(centerPointX, this._nodeHeight, index);
                result.appendChild(connectorSvg);

                let descendantSvg = descendant.toSvg(
                descendantWidth,
                index * descendantWidth,
                this._verticalOffset,
                onClickCallback);

                result.appendChild(descendantSvg);
            });
        }

        result.appendChild(nodeGroup);

        return result;
    }

    _createGroup(translateX = 0, translateY = 0) {

        let result = document.createElementNS(this.xmlns, 'g');
        result.setAttributeNS(null, 'transform', `translate(${translateX}, ${translateY})`);

        return result;
    }

    _createNodeGroup(name, positionX, positionY, onClickCallback) {

        let nodeGroup = this._createGroup(positionX, positionY);
        nodeGroup.setAttributeNS(null, 'class', 'node-group');

        let nodeSvg = this._createNode();
        nodeGroup.appendChild(nodeSvg);

        let titleSvg = this._createTitle(name);
        nodeGroup.appendChild(titleSvg);

        nodeGroup.onclick = ()=> {

            this.descendants.forEach(item => {
                item.changeVisibility();
            });

            if (onClickCallback) {
                onClickCallback();
            }
        };

        return nodeGroup;
    }

    _createNode() {

        var element = document.createElementNS(this.xmlns, 'use');
        element.setAttributeNS(this.xlinkns, 'xlink:href', '#node');

        return element;
    }

    _createTitle(name) {

        var element = document.createElementNS(this.xmlns, 'text');

        element.setAttributeNS(null, 'class', 'node-title');
        element.setAttributeNS(null, 'y', 10);

        var text = document.createTextNode(name);
        element.appendChild(text);

        return element;
    }

    _createConnector(startPositionX, startPositionY, index) {

        var line = document.createElementNS(this.xmlns, 'line');

        line.setAttributeNS(null, 'class', 'connector');

        line.setAttributeNS(null, 'x1', startPositionX);
        line.setAttributeNS(null, 'y1', startPositionY);

        line.setAttributeNS(null, 'x2', startPositionX / this.descendants.length * (index * 2 + 1));
        line.setAttributeNS(null, 'y2', this._verticalOffset + startPositionY);

        return line;
    }
}
export default TreeNode;
