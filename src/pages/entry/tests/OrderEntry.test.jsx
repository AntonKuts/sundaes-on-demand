import  { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
          res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
          res(ctx.status(500))
        )
    );
      
    render(<OrderEntry setOrderPhase={jest.fn()}/>);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });
});

test('disabled button in order', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()}/>);
  const user = userEvent.setup();

  const orderButton = screen.getByRole('button', {name: "Order Sundae!"});
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  expect(orderButton).toBeDisabled();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(orderButton).toBeEnabled();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");

  expect(orderButton).toBeDisabled();
});