// App.js
import { useState } from 'react';
import RyzenLogo from './assets/ryzen.svg';
import './App.css';
import OpenComponent from "./OpenComponent";


const App = () => {
    return (
      <div className="app">
        <h1>Open Movie Database</h1>
        <p>Search for a movie</p>
        <OpenComponent /> {/* Use the renamed component */}
      </div>
    );
  };



export default App;
