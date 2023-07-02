import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants"

const OrderDetails = createContext();

// custom hook

export function useOrderDetails() {
    const contextValue = useContext(OrderDetails);
    if (!contextValue) {
        throw new Error(
            "useOrderDetails must be called from within OrderDetailsProvaider"
        );
    }
    return contextValue;
}

export function OrderDetailsProvaider(props) {
    const [optionCounts, setOptionCounts]  = useState({
        scoops: {}, // {Choclate: 1, Vanilla: 2}
        toppings: {} // {"Gummi Bears" : 1}
    });

    function updateItemCount(itemName, newItemCount, optionType){
        const newOptionCounts = { ...optionCounts };

        newOptionCounts[optionType][itemName] = newItemCount;

        setOptionCounts(newOptionCounts);
    }

    function resetOrder(){
        setOptionCounts({ scoops: {}, toppings: {} })
    }

    function calculateTotal(optionType){
        const countsArray = Object.values(optionCounts[optionType]);

        const totalCout = countsArray.reduce((total, value) => total + value, 0);

        return totalCout * pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings")
    }

    const value = { optionCounts, totals, updateItemCount, resetOrder };
    return <OrderDetails.Provider value={value} {...props} />;
}
