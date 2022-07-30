import "@testing-library/jest-dom";
import { render, screen, userEvent } from "../test-utils";
import { RandomUserGender } from "../types/random-user";
import GenderSelectInput from "./GenderSelectInput";

const fn = {
  onGenderChange: (value: RandomUserGender) => value,
};

describe("GenderSelectInput", async () => {
  it("should render the GenderSelectInput", () => {
    render(<GenderSelectInput onGenderChange={fn.onGenderChange} gender={"all"} />);
    const input = screen.getByTestId("gender");

    expect(screen.getByText("Gender :")).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  it("should trigger onGenderChange when it changed", () => {
    const spyOnGenderChange = vi.spyOn(fn, "onGenderChange");
    render(<GenderSelectInput onGenderChange={fn.onGenderChange} gender={"all"} />);
    expect(screen.getByText("Gender :")).toBeInTheDocument();

    const input = screen.getByTestId("gender");
    userEvent.selectOptions(input, "female");
    expect(input).toBeInTheDocument();

    expect(spyOnGenderChange).toBeCalled();
    expect(spyOnGenderChange).toHaveReturnedWith("female");
  });
});
