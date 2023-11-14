import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from '../store/store.ts';
import { Provider } from 'react-redux';
import { Root } from '../routes/Root.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
