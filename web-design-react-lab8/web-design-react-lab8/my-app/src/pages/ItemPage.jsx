import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import {useParams} from "react-router-dom";

function ItemPage() {
    const {id} = useParams();
    return (
        <div className="ItemPage">
            <Header/>
            <ItemDetails id={id} />
            <Footer/>
        </div>
    );
}

export default ItemPage;