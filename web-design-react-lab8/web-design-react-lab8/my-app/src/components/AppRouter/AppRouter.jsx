import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CatalogPage from "../../pages/CatalogPage";
import ItemPage from "../../pages/ItemPage";


const AppRouter = () => {
    const routes = [
        {path: "/", element: <HomePage/>},
        {path: "/catalog", element: <CatalogPage/>},
        {path: "/catalog/:id", element:<ItemPage/>}
    ]
    return (
        <Routes>
            {routes.map(route =>
                <Route element={route.element} path={route.path}/>)}

            <Route element={<HomePage/>} path="*"/>
        </Routes>

    );
};

export default AppRouter;