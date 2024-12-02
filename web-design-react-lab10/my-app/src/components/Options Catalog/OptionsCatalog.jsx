import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import ApplyButton from "../ApplyButton/ApplyButton";
import axios from 'axios';

const OptionsCatalog = ({ setData }) => {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [search, setSearch] = useState("");

    const applyFilters = async () => {
        console.log('applying filters');
        console.log({size, color, search});
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: { size, color, search }, 
            });
            setData(response.data); 
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [search]);

    return (
        <Container fluid style={{ marginTop: "30px" }}>
            <Row>
                <Col md={6} style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                    <Filter name={"Size"} choices={["XS", "S", "M", "L", "XL"]} state={size} setState={setSize} />
                    <Filter name={"Color"} choices={["Black", "White", "Grey", "Colored"]} state={color} setState={setColor} />
                </Col>
                <Col md={3} style={{ display: "flex", justifyContent: "left" }}>
                    <ApplyButton setData={setData} states={[size, color]} />
                </Col>
                <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Search setSearch={setSearch} />
                </Col>
            </Row>
        </Container>
    );
};

export default OptionsCatalog;
