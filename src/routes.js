import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';

const route = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/products-list',
        exact : false,
        main: () => <ProductListPage />
    },
    {
        path: '/products/add',
        exact: false,
        main: ({history}) => <ProductActionPage history={history}/>
    },
    {
        path: '/products/:id/edit',
        exact: false,
        main: ({match}, {history}) => <ProductActionPage match={match} history={history}/> // match được truyền vào để lấy tham số trên url (là id) phục vụ cho việc đổ dữ liệu để edit
    },
    {
        path: '',
        exact: true,
        main: () => <NotFoundPage />
    }
];

export default route;