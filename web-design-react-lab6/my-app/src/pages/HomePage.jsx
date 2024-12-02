import Header from "../components/header/Header";
import Heading from "../components/heading/Heading";
import Footer from "../components/footer/Footer";
import ProductList from "../components/ProductList/ProductList";

function HomePage() {
    return (
        <div className="HomePage">
            <Header/>
            <Heading/>
            <ProductList/>
            <Footer/>
        </div>
    );
}

export default HomePage;