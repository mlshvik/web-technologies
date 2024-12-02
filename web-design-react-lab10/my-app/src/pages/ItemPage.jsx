
    import Header from "../components/Header/Header";
    import Footer from "../components/Footer/Footer";
    import ItemDetails from "../components/ItemDetails/ItemDetails";
    import { useParams} from "react-router-dom";
    import { useEffect, useState } from "react";
    import axios from "axios";

    function ItemPage() {
        const { id } = useParams();
        const [item, setItem] = useState(null);

        useEffect(() => {
            console.log('Fetching item with id:', id);
            axios.get(`http://localhost:5000/api/products/${id}`)
                .then(response => {
                    console.log('Response data:', response.data);
                    setItem(response.data);
                })
                .catch(error => console.error('Error fetching item:', error));
        }, [id]);

        return (
            <div className="ItemPage">
                <Header />
                {item ? (
                    <div>
                        <ItemDetails data={item} />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <Footer />
            </div>
        );
    }

    export default ItemPage;