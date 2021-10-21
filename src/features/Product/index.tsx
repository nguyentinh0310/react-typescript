import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';

export interface  ProductFeatureProps {
}

export default function ProductFeature (props:  ProductFeatureProps) {
  const match =useRouteMatch()
  return (
    <Switch>
      <Route path={match.url} component={ListPage} />
    </Switch>
  );
}
