// @flow
function showDendrogram(targetDiv) {
    // var select = "optimization3";
    var selectedDot = [];
    var selectedLine = [];

    var nodes = pv.dom(flare).root("flare").nodes();
    console.log(nodes.length);

    var vis = new pv.Panel()
        .width(600)
        .height(nodes.length * 20)
        .left(10)
        .right(0)
        .top(10)
        .canvas(targetDiv)
        .bottom(10);


    prepareData();

    var layout = vis.add(pv.Layout.Cluster)
        .nodes(nodes)
        .group(false)
        // .orient("left");
        .orient("right");

    layout.link.add(pv.Line)
        /*
        .strokeStyle("#ccc")
        */
        .strokeStyle(function (n) {
            /*  console.log(n); */
            /* if ((selectedDepth && selectedBreadth) && n.depth >= selectedDepth && n.breadth >= selectedBreadth) { */
            if (selectedLine.indexOf(n.nodeName) >= 0) {
                return "red";
            }
            return "#333";
            // return n.childNodes.length > 1 ? "blue" : "#333";
        })
        .lineWidth(1)
        .antialias(true);

    layout.node.add(pv.Dot)
        .fillStyle(function (n) {
            if (selectedDot.indexOf(n.nodeName) >= 0) {
                return "red";
            }
            return n.childNodes.length > 1 ? "blue" : "white";
        })
        .strokeStyle(function (n) {
            if (selectedDot.indexOf(n.nodeName) >= 0) {
                return n.childNodes.length > 1 ? "red" : null;
            }
            return n.childNodes.length > 1 ? "blue" : "#333";
        })
        .radius(function (n) {
            if (n.childNodes.length == 0) {
                return 5;
            }
            else {
                return n.childNodes.length > 1 ? 5 : 1;
            }
        })
        .bottom(30)
        .event("click", function (d) {
            // selected = d.nodeName;
            selectedDot = [];
            selectedLine = [];
            selectedLine.push(d.nodeName);
            selectedDot.push(d.nodeName);
            prepareData();
            selectedLine.splice(selectedLine.indexOf(d.nodeName), 1);
            // selected.remove(d.nodeName);
            // console.log(d);
            vis.render();
        })
        // .size(200)
        /*.bottom(function() this.index * 25 + 25)*/
        /*.left(function() this.index * 25 + 25)*/
        ;


    // layout.label.add(pv.Label);
    vis.render();

    function prepareData() {
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            preOrder(n);
            // console.log(n);
        }
    }

    function preOrder(node) {
        if (node == null) return;
        // console.log(node.nodeName);
        if (selectedDot.indexOf(node.nodeName) >= 0) {
            node.childNodes.map(function (a) {
                selectedLine.push(a.nodeName);
                selectedDot.push(a.nodeName);
                // console.log(a.nodeName);
            });
        }
        // console.log(node);
        preOrder(node.left);
        preOrder(node.right);
    }

}

export default showDendrogram;