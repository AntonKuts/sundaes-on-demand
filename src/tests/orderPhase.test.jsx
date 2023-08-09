import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async  () => {
    // render app
    render(<App />);
    const user = userEvent.setup();

    // add ice cream scoops and topings
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "3");

    const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const MAndMstopping = await screen.findByRole("checkbox", {
    name: "M&Ms",
    });
    await user.click(MAndMstopping);
    const Cherriestopping = await screen.findByRole("checkbox", {
    name: "Cherries",
    });
    await user.click(Cherriestopping);

    // find and click order button
    const orderButton = screen.getByRole('button', {name: "Order Sundae!"});
    await user.click(orderButton);

    // check summerry information based on order
    const vanillaInfo = screen.getByText("Vanilla", { exact: false });
    expect(vanillaInfo).toHaveTextContent("3");
    const chocolateInfo = screen.getByText("2 Chocolate");
    expect(chocolateInfo).toBeInTheDocument();
    const MAndMsInfo = screen.getByText("M&Ms1");
    expect(MAndMsInfo).toBeInTheDocument();
    const cherriesInfo = screen.getByText("Cherries1");
    expect(cherriesInfo).toBeInTheDocument();

    // accept terms and conditions and click button to confirm order
    const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
    const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    await user.click(termCheckbox);
    await user.click(confirmButton);

    // loading 
    const loadingInfo = screen.getByText("Loading...");
    expect(loadingInfo).toBeInTheDocument();

    // conferm order number on confirmation page
    const orderNumber = await screen.findByText("Your order number is", { exact: false });
    expect(orderNumber).toHaveTextContent("1234567890");

    // click "new order" button on confirmation page
    const newOrderButton = screen.getByRole('button', {name: "Create new order"});
    await user.click(newOrderButton);

    // check that scoops and toppings subtotals have been reset
    const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
    expect(toppingsSubtotal).toHaveTextContent("0.00");
    // do we need to await anything to avoid test errors?
})