import React from 'react';
import { Route, Switch } from 'react-router';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
