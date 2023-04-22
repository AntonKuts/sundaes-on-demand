import { render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Term checkbox and confirm button test", () => {
    test("Checkbox is unchecked by default", () => {
        render(<SummaryForm />);
        const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
        const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    
        expect(termCheckbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });

    test("Checking checkbox enables botton", async () => {
        const user = userEvent.setup();
        
        render(<SummaryForm />);
        const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
        const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    
        await user.click(termCheckbox);
        expect(termCheckbox).toBeChecked();
        expect(confirmButton).toBeEnabled();
    });

    test("Unchecking checkbox disables botton", async () => {
        const user = userEvent.setup();
        render(<SummaryForm />);
        const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
        const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    
        await user.click(termCheckbox);
        await user.click(termCheckbox);
        expect(termCheckbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });
  });

  test("popover responds to hover", async ()=> {
    const user = userEvent.setup();
    render(<SummaryForm />);
    
    // popover starts out hidden
    const nullPopover = screen.queryByText(
        /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    
    // popover appears on mouseover of checkbox label
    const terms = screen.getByText(/terms and conditions/i);
    await user.hover(terms);
    const popover = screen.queryByText(
        /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    
    // popover desapears when mouse out
    await user.unhover(terms);
    expect(popover).not.toBeInTheDocument();
  });
  