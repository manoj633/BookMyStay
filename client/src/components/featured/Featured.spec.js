// Import the necessary dependencies
import React from "react";
import { render } from "@testing-library/react";
import Featured from "./Featured";

// Renders the component without errors
it("should render the component without errors", () => {
  // Mock the useFetch hook
  jest.mock("../../hooks/useFetch", () => jest.fn());

  // Test the component
  const { container } = render(<Featured />);
  expect(container).toBeInTheDocument();
});
