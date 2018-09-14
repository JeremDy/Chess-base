import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chat from '../Chat';
import CompTest from '../CompTest';
import NotFound from '../NotFound';

const Router = () => (
  <div id="router">
    <Switch>
      {/* Homepage */}
      <Route exact path="/" component={Chat} />
      {/* Recettes */}
      <Route path="/URLTEST" component={CompTest} />
      {/* Fallback global (match sans condition si rien n'a matché avant) */}
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Router;
