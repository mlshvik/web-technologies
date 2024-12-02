import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import '../Search/search.css'

function Search({ setSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = async (e) => {
        const value = e.target.value.trim();
        setQuery(value);
        setSearch(value); 
    };

    return (
        <Form className="search-form mb-2 ">
            <Col>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={handleInputChange}
                    />
                </InputGroup>
            </Col>
        </Form>
    );
}

export default Search;
