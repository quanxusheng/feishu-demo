import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider as StoreProvide } from 'react-redux'
import routes from './router.config'
import './i18n/index'
import './store'
import store from './store';
// import { fakerZH_CN } from '@faker-js/faker'

// const { city, country, cardinalDirection } = fakerZH_CN.location

// console.log('=>city', fakerZH_CN.location)
// console.log('=>city', city())
// console.log('=>city', country())
// console.log('=>city', cardinalDirection())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvide store={store}>
        <RouterProvider router={routes} />
    </StoreProvide>
);
