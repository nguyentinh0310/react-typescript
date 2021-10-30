import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './page/AddEditPage';
import ListPage from './page/ListPage';

export default function StudentFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={ListPage} exact/>

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
