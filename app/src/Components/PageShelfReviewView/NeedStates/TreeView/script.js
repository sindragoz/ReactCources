



/*
    Обход дерева для получения списка выделенных элементов
*/
function preOrder(node, leaves, selectedDot, selectedLine, selectedLeaves) {
  if (node == null) return;

  /*       if (node.children.length < 1) {
          leaves.push(node.nodeName);
        } */

  if (selectedDot.length > 0) {
    if (selectedDot.indexOf(node.name) >= 0) {
      node.children.map((a) => {
        selectedLine.push(a.name);
        selectedDot.push(a.name);

        if (a.children.length < 1) {
          selectedLeaves.push(a.name);
        }
      });
    }
  }

  preOrder(node.left, leaves, selectedDot, selectedLine, selectedLeaves);
  preOrder(node.right, leaves, selectedDot, selectedLine, selectedLeaves);
}


function prepareData(nodes, leaves, selectedDot, selectedLine, selectedLeaves) {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    //reOrder(n, leaves, selectedDot, selectedLine, selectedLeaves);
    console.log(n);
  }
}

function showDendrogram(targetDiv, listDiv, d3, Data) {
  let selectedDot = [];
  let selectedLine = [];

  const leaves = [];
  let selectedLeaves = [];
  
  var width = 960,
    height = 9500;

  var cluster = d3.layout.cluster()
    .size([height, width - 160]);

  var svg = d3.select(targetDiv).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

  d3.json(Data, function (json) {
    var nodes = cluster.nodes(json);

    var link = svg.selectAll(".link")
      .data(cluster.links(nodes))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", elbow);

    var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
      .attr("r", 3.5)
      .style("fill", function (n) {
        if (selectedDot.indexOf(n.name) >= 0) {
          return 'red';
        }
      });

    node.selectAll("circle")
      .on("click", function (d) {
        selectedDot = [];
        selectedDot.push(d.name);
        /*           var selected_circles = d3.select(this).style("fill", function (d) { return 'red'; }); */
        console.log(d);
        console.log(selectedDot);
        prepareData(nodes, leaves, selectedDot, selectedLine, selectedLeaves);
      });
    /*   node.append("text")
          .attr("dx", function(d) { return d.children ? -8 : 8; })
          .attr("dy", 3)
          .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; }); */
  });

  function elbow(d, i) {
    return "M" + d.source.y + "," + d.source.x
      + "V" + d.target.x + "H" + d.target.y;
  }
  var cluster = d3.layout.cluster()
    .size([height, width - 160]);

  var svg = d3.select("dendrogram").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

  d3.json(Data, function (json) {
    var nodes = cluster.nodes(json);

    var link = svg.selectAll(".link")
      .data(cluster.links(nodes))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", elbow);

    var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
      .attr("r", 3.5)
      .style("fill", function (n) {
        if (selectedDot.indexOf(n.name) >= 0) {
          return 'red';
        }
      });

    node.selectAll("circle")
      .on("click", function (d) {
        selectedDot = [];
        selectedDot.push(d.name);
        /*           var selected_circles = d3.select(this).style("fill", function (d) { return 'red'; }); */
        console.log(d);
        console.log(selectedDot);
        prepareData(nodes, leaves, selectedDot, selectedLine, selectedLeaves);
      });
    /*   node.append("text")
          .attr("dx", function(d) { return d.children ? -8 : 8; })
          .attr("dy", 3)
          .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; }); */
  });

  function elbow(d, i) {
    return "M" + d.source.y + "," + d.source.x
      + "V" + d.target.x + "H" + d.target.y;
  }
}

export default showDendrogram;
