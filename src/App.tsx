import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductFeature from 'features/Product';
import Header from 'components/Layout/Header';
import NotFound from 'components/Layout/NotFound';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Redirect from="/" to="/products" exact />
        <Route path="/products">
          <ProductFeature/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
