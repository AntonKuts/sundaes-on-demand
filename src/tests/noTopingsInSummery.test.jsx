import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
describe('no topings in Summery', () => {

    test('no add topings', async  () => {
        // render app
        render(<App />);
        const user = userEvent.setup();

        // add ice cream scoops
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "3");

        const orderButton = screen.getByRole('button', {name: "Order Sundae!"});
        await user.click(orderButton);

        const toppingsTotal = screen.queryByText(/Toppings:/i);
        expect(toppingsTotal).not.toBeInTheDocument();

        // const toppingsTotal = screen.getByText("Toppings:", { exact: false });
        // expect(toppingsTotal).not.toBeInTheDocument()
    })

    test('add and delete topings', async  () => {
        // render app
        render(<App />);
        const user = userEvent.setup();

        // add ice cream scoops
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "3");

        const MAndMstopping = await screen.findByRole("checkbox", {
            name: "M&Ms",
        });
        const scoopsSubtotal = screen.getByText("Toppings total: $", { exact: false });

        await user.click(MAndMstopping);
        expect(scoopsSubtotal).toHaveTextContent("1.50");
        await user.click(MAndMstopping);
        expect(scoopsSubtotal).toHaveTextContent("0");

        const orderButton = screen.getByRole('button', {name: "Order Sundae!"});
        await user.click(orderButton);

        const toppingsTotal = screen.queryByText(/Toppings:/i);
        expect(toppingsTotal).not.toBeInTheDocument();

        // const toppingsTotal = screen.getByText("Toppings:", { exact: false });
        // expect(toppingsTotal).not.toBeInTheDocument()
    })

})