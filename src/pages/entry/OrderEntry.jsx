import Options from "./Options";
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";

export default function OrderEntry({setOrderPhase}) {
    const { totals } = useOrderDetails();
    const totalNumber = totals.scoops + totals.toppings;

    return (
        <div>
            <Options optionType='scoops'/>
            <Options optionType='toppings'/>
            <h2> Grant total: {formatCurrency(totalNumber)} </h2>
            <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
        </div>
    )
}