import React from 'react';
import Tree from 'react-d3-tree';
import {testData} from './testDendrogram.js';
import NodeLabel from './nodeView';
import {datatree} from './dendrogram';
import * as d3 from "d3";
const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];

export default class StructureView extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){
  }
  onNodeClickHandle=(node,event)=>{
    this.seelctNodesByNode(node,event);

  }
  dropSelection(node){
    if(node){
    d3.select(".node"+node.id).style("border", "none");
    d3.selectAll(".linkSelect").remove();
    if(node.parent)
      this.dropSelection(node.parent);
    }
  }
  seelctNodesByNode(node,event){
    this.dropSelection(this.state.selectedNode);
    this.setState({selectedNode:node});
    this.selectNextNode(node);
   }
   selectNextNode(node){
     const currNode= d3.select(".node"+node.id).style("border", "3px solid blue");
     const parent=d3.select(".node"+node.id).node().parentNode.parentNode.parentNode;
     const g=d3.select(parent);
     g.append('path').attr('class','linkSelect').attr('d',function(d){
       if (node.parent)
       return (	  "M "+ (node.parent.y +180)+" "+(node.parent.x+25)+
           "H "+ (node.parent.y+190)+
       	  "V "+ (node.x+25)+
       	  "H "+ node.y
     )
      return '';
    }).style('stroke','blue').attr('fill','none').style('stroke-width','4');
     if(node.parent)
       this.selectNextNode(node.parent);
   }
  onTreeUpdatehandle(){
  }
  render() {
    return (

      <div id="treeWrapper" style={{width: '100%', height: '500px', minHeight:'600px'}}>

        <Tree data={testData}
        allowForeignObjects
        nodeLabelComponent={{
          render: <NodeLabel className='TableLabel' />,
          foreignObjectWrapper: {
            y:-30
          }
        }}
        collapsible={false}
        nodeSvgShape={{shape: 'rect', shapeProps: {width: 0,height:0,transform:'translate(0,0)'}}}
        orientation='horizontal'
        translate={{x: 100, y: 500}}
        pathFunc={function(d,evt){
	  return(
	  "M "+ (d.source.y +180)+" "+(d.source.x+25)+
    "H "+ (d.source.y+190)+
	  "V "+ (d.target.x+25)+
	  "H "+ d.target.y
	  )}}
        onUpdate={this.onTreeUpdatehandle}
        separation={{siblings: 1, nonSiblings: 1}}
        depthFactor={250}
        onClick={(node,event)=>this.onNodeClickHandle(node,event)}
        styles={{
          links:{stroke:'rgba(100,100,100,1)',
          fill:'transparent',
          'strokeWidth':"2",
          'strokeOpacity':'1'}
        }}/>

      </div>
    );
  }
}
