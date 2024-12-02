import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import ProductCard from "../ProductCard/ProductCard";
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        size: null,
        color: null,
        search: null,
    });


    const fetchProducts = async (showAll = false) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: {
                    size: filters.size,
                    color: filters.color,
                    search: filters.search,
                },
            });
            const fetchedProducts = response.data;

            // Відображаємо всі продукти або лише частину
            setProducts(showAll ? fetchedProducts : fetchedProducts.slice(0, 3));
            setShowAllProducts(showAll);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Виконати початкове завантаження
    useEffect(() => {
        fetchProducts(false);
    }, [filters]); // Залежність від фільтрів

    // Обробка кліку на кнопку
    const handleToggleProducts = () => {
        fetchProducts(!showAllProducts);
    };

    return (
        <Container style={{ marginTop: "100px", marginBottom: "50px" }}>
            <Row>
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        imageSrc={product.imageSrc}
                        title={product.title}
                        description={product.description}
                        link={product.link}
                    />
                ))}
            </Row>
            <div className="text-center" style={{ marginTop: "20px" }}>
                <Button
                    variant="primary"
                    style={{ backgroundColor: "#333", borderStyle: "none" }}
                    onClick={handleToggleProducts}
                    disabled={loading} // Вимикаємо кнопку, якщо завантаження триває
                >
                    {loading ? "Loading..." : showAllProducts ? "Hide" : "Show More"}
                </Button>
            </div>
        </Container>
    );
}

export default ProductList;
