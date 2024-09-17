import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import './index.css'
import AppWithRedux from './AppWithRedux.tsx';
import { store } from './state/store.ts';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);
