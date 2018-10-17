import React from 'react';
import TreeViewList from './TreeViewList/index';
import Dendrogram from './Dendrogram/index';
import './styles.scss';

const TreeView = () => (
  <div className='tree-view__container'>
    <TreeViewList />
    <Dendrogram />
  </div>
)

export default TreeView;