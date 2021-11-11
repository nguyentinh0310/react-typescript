import { Box } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

export default function ProductFeature() {
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}
