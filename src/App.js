import React, { useState } from 'react';
import SortingVisualizer from './Components/Sorting/SortingVizualizer/SortingVizualizer.jsx';
import Pathfinding from './Components/Pathfinding/Pathfinding';
import Header from './Components/Header/Header.jsx';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import history from './history';

function App() {
  const [running, setRunning] = useState(false);

  const isRunning = () => {
    setRunning(true);
  };

  const hasFinished = () => {
    setRunning(false);
  };
  //<Route exact path="/props-through-render"
  //render={(props) => <PropsPage {...props} title={`Props through render`} />} />

  return (
    <div className='App'>
      <div>
        <Router history={history}>
          <Header running={running} />
          <Route
            path='/'
            exact
            render={() => (
              <SortingVisualizer
                isRunning={isRunning}
                hasFinished={hasFinished}
              />
            )}
          />
          <Route
            path='/pathfinding'
            exact
            render={() => (
              <Pathfinding isRunning={isRunning} hasFinished={hasFinished} />
            )}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
