import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductCatalogList from "../components/ProductCatalogList/ProductCatalogList";
import OptionsCatalog from "../components/Options Catalog/OptionsCatalog";
import {useState} from "react";
import products from "../data/data"

function CatalogPage() {
    const [items, setItems] = useState(products)

    return (
        <div className="CatalogPage">
            <Header/>
            <OptionsCatalog data={items} setData={setItems}/>
            <ProductCatalogList data={items}/>
            <Footer/>
        </div>
    );
}

export default CatalogPage;
