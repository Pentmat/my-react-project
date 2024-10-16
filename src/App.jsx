// App.js
import React from 'react';
import RyzenLogo from './assets/ryzen.svg';
import './App.css';
import ComponentUI from './ComponentUI';
import { Header } from './ComponentUI'; // Import Header from ComponentUI

function App() {
  return (
    <div className="App">
      <Header title="Shop for Ryzen" image={RyzenLogo} />
      <ComponentUI />
    </div>
  );
}

export default App;