import React, {useState} from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import ProductCard from "../ProductCard/ProductCard";
// import {Link} from "react-router-dom";
import products from "../../data/data";

function ProductList() {
    const [showAllProducts, setShowAllProducts] = useState(false);
    const displayedProducts = showAllProducts ? products : products.slice(0, 3);

    return (
        <Container style={{ marginTop: "100px", marginBottom: "50px" }}>
            <Row>
                {displayedProducts.map((product) => (
                    <ProductCard
                        imageSrc={product.imageSrc}
                        title={product.title}
                        description={product.description}
                        link={product.link}
                    />
                ))}
            </Row> 
            {!showAllProducts ? (
                <div className="text-center">
                    <Button
                        variant="primary"
                        style={{ backgroundColor: "#333", borderStyle: "none" }}
                        onClick={() => setShowAllProducts(true)}
                    >
                        Show More
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                    <Button
                        variant="primary"
                        style={{ backgroundColor: "#333", borderStyle: "none" }}
                        onClick={() => setShowAllProducts(false)}
                    >
                        Hide
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default ProductList;
