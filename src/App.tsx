import './App.scss';

import * as allStores from './stores';

import { Route, Router, Switch } from 'react-router';

import Home from './pages/home/Home';
import { LocaleProvider } from 'antd';
import { Provider } from 'mobx-react';
import React from 'react';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, allStores.routingStore);

const App: React.FC = () => {
  return (
    <Provider {...allStores}>
      <LocaleProvider locale={zh_CN}>
        <Router history={history}>
          <Switch>
            <Route component={Home} />
          </Switch>
        </Router>
      </LocaleProvider>
    </Provider>
  );
};

export default App;
