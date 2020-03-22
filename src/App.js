import React from 'react';
import SortingVisualizer from './Components/Sorting/SortingVizualizer/SortingVizualizer.jsx';
import Pathfinding from './Components/Pathfinding/Pathfinding';
import Header from './Components/Header/Header.jsx';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import history from './history';

function App() {
  return (
    <div className='App'>
      <div>
        <Router history={history}>
          <Header />
          <Route path='/' exact component={SortingVisualizer} />
          <Route path='/pathfinding' exact component={Pathfinding} />
        </Router>
      </div>
    </div>
  );
}

export default App;
