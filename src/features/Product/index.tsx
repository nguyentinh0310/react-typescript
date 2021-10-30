import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';


export default function ProductFeature () {
  const match =useRouteMatch()
  return (
    <Switch>
      <Route path={match.url} component={ListPage} />
    </Switch>
  );
}
