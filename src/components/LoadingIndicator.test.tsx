import "@testing-library/jest-dom";
import { render, screen } from "../test-utils";
import LoadingIndicator from "./LoadingIndicator";

describe("LoadingIndicator", async () => {
  it("should render the LoadingIndicator", () => {
    render(<LoadingIndicator />);

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
});
