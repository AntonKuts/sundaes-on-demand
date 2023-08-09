import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const SummaryForm = ({ setOrderPhase }) => {

    const [isCheckboxCheck, setIsCheckboxCheck] = useState(false);

    const popover = (
        <Popover id="popover-basic">
          <Popover.Body>
              No ice cream will actually be delivered
          </Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <p>
          I agree to
          <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: "blue" }}>
                    Terms and Conditions
                </span>
           </OverlayTrigger>
        </p>
    );

    return (
        <Form>
            <Form.Group controlId="termCheckbox">
                <Form.Check
                    type="checkbox"
                    name='termCheckbox'
                    checked={isCheckboxCheck}
                    onChange={(e) => setIsCheckboxCheck(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button 
                variant="primary" name='confirmButton'
                disabled={!isCheckboxCheck}
                onClick={() => setOrderPhase("completed")}
            >
                Confirm order
            </Button>
        </Form>
    );
}