import "./App.css";
// pages
import { SummaryForm } from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Options";

function App() {
  return (
    <div className="App">
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <SummaryForm />
    </div>
  );
}

export default App;
