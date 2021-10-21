import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductFeature from 'features/Product';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect from="/" to="/products" exact />
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  );
}

export default App;
