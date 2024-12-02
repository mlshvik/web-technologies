import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CatalogPage from "../../pages/CatalogPage";
import ItemPage from "../../pages/ItemPage";
import CartPage from "../../pages/CartPage";  // Правильний шлях імпорту CartPage



const AppRouter = () => {
    const routes = [
        { path: "/", element: <HomePage /> },
        { path: "/catalog", element: <CatalogPage /> },
        { path: "/catalog/:id", element: <ItemPage /> },
        { path: "/cart", element: <CartPage /> } // Тут коректно переданий CartPage
    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}

            {/* Якщо жоден маршрут не співпав, показуємо HomePage */}
            <Route path="*" element={<HomePage />} />
        </Routes>
    );
};

export default AppRouter;
