import React from 'react';
import MainMenu from './MainMenu';

class MainLayout extends React.Component {
  render() {
    return (
      <div className="App">
        <MainMenu />
        {this.props.children}
      </div>
    );
  }
}

export default MainLayout;
