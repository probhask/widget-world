import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockRenderWithContext from "@utils/MockRenderWithContext";
import StoreTabNavigate from "../StoreTabNavigate";
import Available from "../Available/Available";
import CreateNew from "../CreateNew/CreateNew";

describe("StoreTab Navigate Component Etsy Case", () => {
  const renderStoreTabComp = () => MockRenderWithContext(<StoreTabNavigate />);
  it("render StoreTab Component", () => {
    renderStoreTabComp();
  });
  it("Tab Component test case", () => {
    renderStoreTabComp();

    expect(screen.getByTitle(/tab/i)).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /available/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /create new/i })
    ).toBeInTheDocument();
  });
});

describe("Available component Test case", () => {
  const renderAvailableComp = () => MockRenderWithContext(<Available />);

  it("render available by default", () => {
    renderAvailableComp();
    expect(screen.getByText(/Total Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Widget/i)).toBeInTheDocument();
  });
});
describe("CreateNew component Test case", () => {
  const renderCreateNewComp = () => MockRenderWithContext(<CreateNew />);

  it("render CreateNew by default", () => {
    renderCreateNewComp();

    expect(screen.getByText(/widget/i)).toBeInTheDocument();
  });
  it("form element ", () => {
    renderCreateNewComp();

    expect(screen.queryByLabelText(/New Category/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/information/i)).toBeInTheDocument();
  });
});
