import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Contract } from './pages/contract';
import { HomePage } from './pages/home-page';
import { Layout } from './pages/layout';
import { LayoutHomePage } from './pages/layout/layout-home-page';
import { Terms } from './pages/terms';
import { store } from './redux-toolkit/books/store';

import './fonts.css';
import './index.css';
import { Registration } from './pages/registration/registration';
import { LayoutAuthorization } from './pages/layout/layout-authorization';


const root = ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment);

root.render(

    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutHomePage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<HomePage />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/contract' element={<Contract />} />
            </Route>
            <Route path='/books/:category/:userId' element={<BookPage />} />
            <Route path='/Profile' element={<div> Profile </div>} />
            <Route path='/exit' element={<div> exit </div>} />
          </Route>

            <Route path='/authorization' element={<LayoutAuthorization/>}>
            <Route path='/authorization/login' element={<div>Login</div>} />
            <Route path='/authorization/registration' element={<Registration/>} />
        </Route>
        </Routes>
      </HashRouter>
    </Provider>

);
