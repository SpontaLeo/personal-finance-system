import './App.scss';

import { Button } from 'antd';
import React from 'react';
import logo from './logo.svg';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="primary">Button</Button>
      </header>
    </div>
  );
}

export default App;
