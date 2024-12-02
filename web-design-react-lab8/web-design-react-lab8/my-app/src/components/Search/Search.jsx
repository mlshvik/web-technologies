import React from 'react';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import products from "../../data/data";


const handleSearch = (searchQuery, setData) => {
    const trimmedQuery = searchQuery.trim().toLowerCase(); 
    
 
    if (!trimmedQuery) {
        setData(products);
        return;
    }

    const filteredResults = products.filter(product => 
        product.title.toLowerCase().includes(trimmedQuery)
    );

    setData(filteredResults);
};


function Search({setData}) {

    return (
        <Form className="mb-3">
            <Col>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => handleSearch(e.target.value, setData)}
                    />
                </InputGroup>
            </Col>
        </Form>
    );
}

export default Search;
