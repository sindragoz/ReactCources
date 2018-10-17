import React from 'react';
import * as d3 from 'd3';
import jsonData from '../dendrogram.json';
import jsonDataNames from '../plu.json';
import './styles.scss';

const goThroughAllChildNodes = (node, context) => {
  // node.selected = true;
  // node.children.forEach(item => {
  //   item.selected = true;
  //   if (item.children) {
  //     goThroughAllChildNodes(item, context);
  //   } else {
  //     let arr = context.state.nodeItems;
  //     arr.push(item.data.name);
  //     context.setState({
  //       nodeItems: arr
  //     });
  //   }
  // });
  let nodes = node.descendants(),
      arr = [];
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i].children) {
      arr.push(nodes[i].data.name);
    }
  }
  context.setState({
    nodeItems: arr
  });
};

class Dendrogram extends React.Component {
  constructor() {
    super();
    this.dendrogramRef = React.createRef();
    this.linksRef = React.createRef();
    this.nodesRef = React.createRef();

    this.nodes = null;
    this.state = {
      nodeItems: []
    };
    this.clusterWidth = 730;
    this.clusterNodeNamesWidth = 270;
  }

  componentDidMount() {
    const dendrogram = d3
      .cluster()
      .size([9900, this.clusterWidth])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1));
    const root = d3.hierarchy(jsonData, d => d.children);
    dendrogram(root);

    this.nodes = d3
      .select(this.nodesRef.current)
      .selectAll('circle.node')
      .data(root.descendants())
      .enter();

    this.nodes
      .append('circle')
      .classed('node', true)
      .attr('cx', d => this.clusterWidth + this.clusterNodeNamesWidth - d.y)
      .attr('cy', d => d.x)
      .attr('r', 5)
      .on('click', this.handleCircleClick.bind(this));

    this.nodes
      .append('text')
      .attr('dx', 0)
      .attr('dy', d => d.x + 5)
      .text(
        d =>
          d.children
            ? null
            : jsonDataNames[0][d.data.name.slice(d.data.name.lastIndexOf('-') + 1)]
      )
      .classed('node__text', true);

    const link = d3
      .select(this.linksRef.current)
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr(
        'd',
        d =>
          `M${this.clusterWidth + this.clusterNodeNamesWidth - d.source.y},${
            d.source.x
          }V${d.target.x}H${this.clusterWidth +
            this.clusterNodeNamesWidth -
            d.target.y}`
      );
  }

  updateDendrogram() {
    console.log('hello');
  }

  handleCircleClick(item) {
    let date = Date.now();
    console.log(item);
    if (item.children) {
      goThroughAllChildNodes(item, this);
    }
    console.log(Date.now() - date);
    this.updateDendrogram();
    console.log(this.state.nodeItems);
  }

  render() {
    return (
      <div
        className="dendrogram__wrap"
        style={{
          width: this.clusterWidth + this.clusterNodeNamesWidth + 50
        }}
      >
        <svg
          className="dendrogram"
          ref={this.dendrogramRef}
          style={{
            width: this.clusterWidth + this.clusterNodeNamesWidth + 30
          }}
        >
          <g className="links" ref={this.linksRef} />
          <g className="nodes" ref={this.nodesRef} />
        </svg>
      </div>
    );
  }
}

export default Dendrogram;
