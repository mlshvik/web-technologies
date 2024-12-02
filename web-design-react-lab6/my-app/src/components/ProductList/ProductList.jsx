import React from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import ProductCard from "../ProductCard/ProductCard";

function ProductList() {
    const products = [
        {
            imageSrc: '/images/basic_hoodie.png',
            title: 'Basic Hoodie',
            description: 'A basic hoodie for walking and sports in winter. Available in 5 colours: black, blue, dark grey, brown and white. Sizes: S, M, L',
            link: '',
        },
        {
            imageSrc: '/images/sport_pants.png',
            title: 'Sport Pants',
            description: 'Sports pants that can be worn both for running. Available in three sizes S, M and L, and in three colours black, beige and light green',
            link: '',
        },
        {
            imageSrc: '/images/sport_suit.png',
            title: 'Sport_suit',
            description: 'Two-piece sports suit, top + bicycles. Top with cups, high-waisted bicycles. Colours: beige, milk, brown, coral. Sizes: XS, S, M',
            link: '',
        },
    ];

    return (
        <Container style={{marginTop: "100px", marginBottom:"50px"}}>
            <Row>
                {products.map((product) => (
                    <ProductCard
                        imageSrc={product.imageSrc}
                        title={product.title}
                        description={product.description}
                        link={product.link}
                    />
                ))}
            </Row>
            <div className="text-center">
                <Button variant="primary" style={{backgroundColor:"#333", borderStyle:"none"}}>
                    Show More
                </Button>
            </div>
        </Container>
    );
}

export default ProductList;
