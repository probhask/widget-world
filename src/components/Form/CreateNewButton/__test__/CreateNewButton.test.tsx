import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateNewButton from "../CreateNewButton";

describe("render CreateNewButton component", () => {
  const renderButtonComp = () =>
    render(<CreateNewButton text="Button" type="submit" />);
  it("render button", () => {
    renderButtonComp();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("button text send with prop", () => {
    renderButtonComp();
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/button/i);
  });
  it("button type send with prop", () => {
    renderButtonComp();
    const button = screen.getByRole("button");
    expect(button).toHaveProperty("type", "submit");
  });
});
