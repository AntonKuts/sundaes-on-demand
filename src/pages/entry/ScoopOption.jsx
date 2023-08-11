import React, { useState } from "react";
// react-bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
// useOrderDetails
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function ScoopOptions({ name, imagePath }) {

  const [isValid, setIsValid] = useState(true);
  const { updateItemCount } = useOrderDetails();
  const handleChange=(e)=> {
    const value = parseFloat(e.target.value);
    const isValidInput = value >= 0 
      && value < 21 && Math.floor(e.target.value) === value;
    if (isValidInput) {
      setIsValid(true);
      updateItemCount(name, value,'scoops');
    } 
    else {
      setIsValid(false);
    }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px"}}
      >
        <Form.Label colum xs="6" style={{textAlign: 'right'}}>
          {name}
        </Form.Label>
        <Col xs="5" style={{textAlign: 'left'}}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
            min={0}
            max={20}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
