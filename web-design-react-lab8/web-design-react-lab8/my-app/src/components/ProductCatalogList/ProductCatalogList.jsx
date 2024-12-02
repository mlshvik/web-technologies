import React from 'react';
import {Container, Row} from 'react-bootstrap';
import ProductCatalogCard from "../ProductCatalogCard/ProductCatalogCard";

function ProductCatalogList({data}) {

    if (data.length === 0) {
        return (
            <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
                <Row>
                    <p>Nothing was found for your search:(</p>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{marginTop: "50px", marginBottom:"50px"}}>
            <Row>
                {data.map((product, index) => (
                    <ProductCatalogCard
                        key={index}
                        imageSrc={product.imageSrc}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        link={product.link}
                    />
                ))}
            </Row>
        </Container>
    );
}

export default ProductCatalogList;