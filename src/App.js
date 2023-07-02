import "./App.css";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvaider } from "./contexts/OrderDetails";

// pages
/// import { SummaryForm } from "./pages/summary/SummaryForm";
// import Options from "./pages/entry/Options";

function App() {
  return (
    <Container>
      <OrderDetailsProvaider>
        <OrderEntry />
      </OrderDetailsProvaider>
    </Container>
  );
}

export default App;
