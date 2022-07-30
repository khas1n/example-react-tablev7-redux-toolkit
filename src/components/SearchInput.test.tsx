import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { render, screen, userEvent } from "../test-utils";
import SearchInput from "./SearchInput";

const fn = {
  onSearch: (value: string) => value,
};
const { result } = renderHook(() => useRef<HTMLInputElement>(null));

describe("SearchInput", async () => {
  it("should render the Searchinput", () => {
    render(<SearchInput onSearch={fn.onSearch} ref={result.current} />);
    const textInput = screen.getByTestId("table-search");
    expect(textInput).toBeInTheDocument();
  });
  it("should change Searchinput value", () => {
    const spyonSearch = vi.spyOn(fn, "onSearch");
    render(<SearchInput onSearch={fn.onSearch} ref={result.current} />);

    const textInput = screen.getByTestId("table-search");
    expect(textInput).toBeInTheDocument();

    userEvent.type(textInput, "algo");

    expect(spyonSearch).toBeCalled();
    expect(textInput).toHaveValue("algo");
  });
});
