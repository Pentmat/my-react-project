// App.js
import RyzenLogo from './assets/ryzen.svg';
import './App.css';
import ComponentUI from './ComponentUI'; // Import the whole ComponentUI

function App() {
  return (
    <div className="App">
      <Header title="Shop for Ryzen" image={RyzenLogo} />
      <ComponentUI /> {/* ComponentUI will handle all the product order logic */}
    </div>
  );
}

export default App;