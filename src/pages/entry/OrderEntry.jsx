import Options from "./Options";
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
    const { totals } = useOrderDetails();
    const totalNumber = totals.scoops + totals.toppings;

    return (
        <div>
            <Options optionType='scoops'/>
            <Options optionType='toppings'/>
            <h2> Grant total: {formatCurrency(totalNumber)} </h2>
        </div>
    )
}