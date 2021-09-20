import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import TaskPage from './pages/tasks';
import { DefaultModal } from './components/global/DefaultModal';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/tasks/:id'}>
          <TaskPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
