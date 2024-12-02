import Header from "../components/Header/Header";
import Heading from "../components/Heading/Heading";
import Footer from "../components/Footer/Footer";
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