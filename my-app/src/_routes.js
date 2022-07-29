import React from 'react';
import Home from './home';
import New from './new';
import View from './view';
import Update from './update';


const routes=[
    {
        path: "/",
        element:<Home />
    },
    {
        path: "/update/:id",
        element:<Update/>
    },
    {
        path: "/view/:id",
        element:<View/>
    },
    {
        path: "/addBill",
        element: <New/>
    }
]

export default routes;
