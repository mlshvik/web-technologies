import React from 'react';
import {Form} from 'react-bootstrap';

const Filter = ({name, choices, state, setState}) => {

    return (
        <Form.Group>
            <Form.Control as="select" value={state}
                          onChange={(e) => setState(e.target.value)}>
                <option value="">Select {name}</option>
                {choices.map((choice) => (
                    <option key={choice} value={choice}>
                        {choice}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};


export default Filter;
