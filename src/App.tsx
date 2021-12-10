import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductFeature from 'features/Product';
import Header from 'components/Layout/Header';
import NotFound from 'components/Layout/NotFound';
import StudentFeature from 'features/DashBoard/student';
import CartFeature from 'features/Cart';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/" to="/products" exact />
        <Route path="/products">
          <ProductFeature />
        </Route>
        <Route path="/admin" >
          <StudentFeature />
        </Route>
        <Route path="/cart" >
          <CartFeature />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
