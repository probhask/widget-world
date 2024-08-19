import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";

describe("Header Component Test cases", () => {
  const renderHeaderComp = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  it("render Header", () => {
    renderHeaderComp();
    expect(
      screen.getByRole("heading", { name: /Widget World/i })
    ).toBeInTheDocument();
  });

  it("render create new btn", () => {
    renderHeaderComp();
    const createNew = screen.getByTitle(/create-new/i);
    expect(createNew).toBeInTheDocument();
  });
  it("render widget-store btn", () => {
    renderHeaderComp();
    const widgetStore = screen.getByTitle(/widget-store/i);
    expect(widgetStore).toBeInTheDocument();
  });
});
