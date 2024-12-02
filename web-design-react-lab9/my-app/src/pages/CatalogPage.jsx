import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductCatalogList from "../components/ProductCatalogList/ProductCatalogList";
import OptionsCatalog from "../components/Options Catalog/OptionsCatalog";
import { useState, useEffect } from "react";
import axios from "axios";

function CatalogPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="CatalogPage">
            <Header />
            <OptionsCatalog data={items} setData={setItems} />
            <ProductCatalogList data={items} />
            <Footer />
        </div>
    );
}

export default CatalogPage;
