import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider as StoreProvide } from 'react-redux'
import routes from './router.config'
import './i18n/index'
import './store'
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvide store={store}>
        <RouterProvider router={routes} />
    </StoreProvide>
);
