import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Bubble } from './screens/bubble';
import { Count } from './screens/count';
import { Merge } from './screens/merge';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <React.Fragment>
      <Router>
        
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Bubble} />
          <Route path="/count" component={Count} />
          <Route path="/merge" component={Merge} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
