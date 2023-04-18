import { render, screen, fireEvent } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

describe("Term checkbox and confirm button test", () => {
    test("Checkbox is unchecked by default", () => {
        render(<SummaryForm />);
        const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
        const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    
        expect(termCheckbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });

    test("Checking checkbox enables botton", () => {
        render(<SummaryForm />);
        const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
        const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    
        fireEvent.click(termCheckbox);
        expect(termCheckbox).toBeChecked();
        expect(confirmButton).toBeEnabled();
    });

    test("Unchecking checkbox disables botton", () => {
        render(<SummaryForm />);
        const termCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
        const confirmButton = screen.getByRole('button', {name: "Confirm order"});
    
        fireEvent.click(termCheckbox);
        fireEvent.click(termCheckbox);
        expect(termCheckbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });
  });