import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
 
// scoops tests
test("subtotal scoops starts at 0", async () => {
  const { unmount } = render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // explicitly unmount component to trigger network call cancellation on cleanup
  // (necessary to avoid race condition if component unmounts when test function exits)
  unmount();
});

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

// toppings tests
test("subtotal toppings starts at 0", async () => {
  const { unmount } = render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // explicitly unmount component to trigger network call cancellation on cleanup
  // (necessary to avoid race condition if component unmounts when test function exits)
  unmount();
});

test("update scoop subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update M&Ms-topping-checkbox scoops to 1 and check the subtotal
  const MAndMstopping = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  const Cherriestopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(MAndMstopping);
  expect(scoopsSubtotal).toHaveTextContent("1.50");
  await user.click(Cherriestopping);
  expect(scoopsSubtotal).toHaveTextContent("3.00");
  await user.click(MAndMstopping);
  expect(scoopsSubtotal).toHaveTextContent("1.50");
});

describe('grand total', () => {

  test('grand total starts at $0.00', ()=> {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByText("Grant total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test('grand total updates properly if scoop is added first', async ()=>{
    const user = userEvent.setup();
    render(<OrderEntry />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    const grandTotal = screen.getByText("Grant total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("2.00");
  });

  test('grand total updates properly if topping is added first', async ()=>{
    const user = userEvent.setup();
    render(<OrderEntry />);
    const MAndMstopping = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(MAndMstopping);
    const grandTotal = screen.getByText("Grant total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("1.50");
  });

  test('grand total updates properly if item is removed', async ()=>{
    const user = userEvent.setup();
    render(<OrderEntry />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    await user.type(vanillaInput, "0");

    const MAndMstopping = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(MAndMstopping);
    await user.click(MAndMstopping);
   
    const grandTotal = screen.getByText("Grant total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0");
  });
})