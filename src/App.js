import "./App.css";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
// pages
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderSummery } from "./pages/summary/OrderSummary";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
//
import OrderDetailsProvaider from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let CorrentComponent = OrderEntry;
  if (orderPhase === "review") CorrentComponent = OrderSummery;
  if (orderPhase === "completed") CorrentComponent = OrderConfirmation;

  return (
    <Container>
      <OrderDetailsProvaider>
        <CorrentComponent setOrderPhase={setOrderPhase} />
      </OrderDetailsProvaider>
    </Container>
  );
}

export default App;
