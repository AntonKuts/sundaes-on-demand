import React from 'react';
import { SummaryForm } from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

export const OrderSummery = ({ setOrderPhase }) => {

    const { totals, optionCounts } = useOrderDetails();
    const totalNumber = totals.scoops + totals.toppings;

    const scoopArray = Object.entries(optionCounts.scoops);
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingArray = Object.entries(optionCounts.toppings);
    const toppingList = toppingArray
        .filter(item => item[1])
        .map(key => (
            <li key={key[0]}>
                {key[0]}
            </li>
        )
    );

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            {toppingList.length
                ? (
                    <>
                    <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
                    <ul>{toppingList}</ul>
                    </>
                )
                : ''
            }
            <h2> Total: {formatCurrency(totalNumber)} </h2>
            <SummaryForm setOrderPhase={setOrderPhase}/>
        </div>
    )

}
