import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockRenderWithContext from "@utils/MockRenderWithContext";
import StoreTabNavigate from "../StoreTabNavigate";
import Available from "../Available/Available";
import CreateNew from "../CreateNew/CreateNew";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("StoreTab Navigate Component Test Case", () => {
  const renderStoreTabComp = () => MockRenderWithContext(<StoreTabNavigate />);
  it("render StoreTab Component", () => {
    renderStoreTabComp();
  });
  describe("Tab Component test case", () => {
    it("render tab component", async () => {
      renderStoreTabComp();

      expect(screen.getByTitle(/tab/i)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /available/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /create new/i })
      ).toBeInTheDocument();
    });

    describe("should apply active class to correct link based on the route", () => {
      it("available tab", () => {
        render(
          <MemoryRouter initialEntries={["/store"]}>
            MockRenderWithContext(
            <StoreTabNavigate />)
          </MemoryRouter>
        );
        expect(screen.getByRole("link", { name: /available/i })).toHaveClass(
          "active"
        );
        expect(
          screen.getByRole("link", { name: /create new/i })
        ).not.toHaveClass("active");
      });
      it("create new tab", () => {
        render(
          <MemoryRouter initialEntries={["/create-new"]}>
            MockRenderWithContext(
            <StoreTabNavigate />)
          </MemoryRouter>
        );
        expect(
          screen.getByRole("link", { name: /available/i })
        ).not.toHaveClass("active");
        expect(screen.getByRole("link", { name: /create new/i })).toHaveClass(
          "active"
        );
      });
    });
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
  it("render form element ", () => {
    renderCreateNewComp();

    expect(screen.queryByLabelText(/New Category/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/information/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("reset button functionality", async () => {
    const user = userEvent.setup();
    renderCreateNewComp();
    const resetBtn = screen.getByRole("button", { name: /reset/i });
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    await user.type(titleInput, "test title");
    // screen.debug();
    expect(titleInput).toHaveValue("test title");
    await user.click(resetBtn);
    expect(titleInput).not.toHaveValue("test title");
    // empty value
    expect(titleInput).toHaveValue("");
  });
});
