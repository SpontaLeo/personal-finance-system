import './App.scss';
import 'moment/locale/zh-cn';

import * as allStores from './render/stores';

import { Route, Router, Switch } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import Home from './render/pages/home/Home';
import { Provider } from 'mobx-react';
import React from 'react';
import { createHashHistory } from 'history';
import moment from 'moment';
import { syncHistoryWithStore } from 'mobx-react-router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

moment.locale('zh-cn');

const hashHistory = createHashHistory();
const history = syncHistoryWithStore(hashHistory, allStores.routingStore);

const App: React.FC = () => {
  return (
    <Provider {...allStores}>
      <ConfigProvider locale={zh_CN}>
        <Router history={history}>
          <Switch>
            <Route component={Home} />
          </Switch>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
