import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import ApplyButton from "../ApplyButton/ApplyButton";


const filterSize = (size, data) => {
    if (size === "") {
        return data;
    } else {
        return data.filter(item => item.size.includes(size));
    }
}

const filterColor = (color, data) => {
    if (color === "") {
        return data;
    } else {
        return data.filter(item => item.color.includes(color));
    }
}

const OptionsCatalog = ({data, setData}) => {
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    return (
        <Container fluid style={{marginTop:"30px"}}>
            <Row>
                <Col md={6} style={{display: "flex", justifyContent: "center", gap:"40px"}}>
                    <Filter name={"Size"} choices={["XS", "S", "M", "L", "XL"]} state={size} setState={setSize}/>
                    <Filter name={"Color"} choices={["Black", "White", "Grey", "Colored"]} state={color} setState={setColor}/>
                </Col>
                <Col md={3} style={{display: "flex", justifyContent: "left"}}>
                    <ApplyButton setData={setData} states={[size, color]} filters={[filterSize, filterColor]}/>
                </Col>
                <Col md={3} style={{display: "flex", justifyContent: "center"}}>
                    <Search setData={setData}/>
                </Col>
            </Row>
        </Container>
    );
};

export default OptionsCatalog;
