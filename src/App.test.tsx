import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "../src/App";

describe("App Component test case", () => {
  it("render App Comp", () => {
    render(<App />);
  });
});
