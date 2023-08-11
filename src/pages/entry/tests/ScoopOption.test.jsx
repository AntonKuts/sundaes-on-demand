import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test('not valid value in scoop option', async () => {
    const user = userEvent.setup();
    render(<ScoopOption name="Vanilla" imagePath="/images/vanilla.png"/>);

    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "30");

    expect(vanillaInput).toHaveClass('is-invalid');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "-1");

    expect(vanillaInput).toHaveClass('is-invalid');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "5.55");

    expect(vanillaInput).toHaveClass('is-invalid');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "15");

    expect(vanillaInput).not.toHaveClass('is-invalid');
})