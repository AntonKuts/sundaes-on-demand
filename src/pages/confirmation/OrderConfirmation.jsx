import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export const OrderConfirmation = ({ setOrderPhase }) => {

    const [orderNumber, setOrderNumber] = useState(null);
    const { resetOrder } = useOrderDetails();

    useEffect(() => {
        axios
          .post(`http://localhost:3030/order`)
          .then((response) => setOrderNumber(response.data.orderNumber))
          .catch((error) => {
            setOrderNumber('error');
            console.log('error!', error);
          });
      }, []);

    const newOrder =()=> {
        setOrderPhase("inProgress");
        resetOrder();
    }

    if (!orderNumber) return <p>Loading...</p>
    return (
        <div style={{ textAlign: "center" }}>
            {orderNumber !== 'error'
                ? (
                    <>
                    <h3>Thank you!</h3>
                    <h5>Your order number is {orderNumber}</h5>
                    <p>as per terms and conditions, nothing heppen now</p> 
                    </>
                )
                : <AlertBanner />
            }
            <Button onClick={newOrder}>Create new order</Button>
        </div>
    )
};