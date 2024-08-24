import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoreWidgetList from "../StoreWidgetList";
import MockRenderWithContext, {
  mockContextValue,
  mockWidgetList,
} from "@utils/MockRenderWithContext";
import userEvent from "@testing-library/user-event";

describe("StoreWidgetList Component Test cases", () => {
  const renderStoreWidgetListComp = (isSearch: boolean = false) =>
    MockRenderWithContext(
      <StoreWidgetList widgetList={mockWidgetList} isSearch={isSearch} />
    );
  it("render StoreWidgetList", () => {
    renderStoreWidgetListComp();
    expect(
      screen.getByRole("heading", { name: /category 1/i })
    ).toBeInTheDocument();
  });
  it("render delete category ", async () => {
    const user = userEvent.setup();
    renderStoreWidgetListComp();
    const deleteCategoryButtons = screen.getAllByTitle(/delete-category/i);
    expect(deleteCategoryButtons.length).toBeGreaterThan(1);
    await user.click(deleteCategoryButtons[0]);
    const updateDeleteCategoryButtons =
      screen.getAllByTitle(/delete-category/i);

    expect(updateDeleteCategoryButtons.length).toBeGreaterThan(
      deleteCategoryButtons.length - 1
    );
  });
  it("delete widget ", async () => {
    const user = userEvent.setup();
    renderStoreWidgetListComp();
    const deleteWidgetButtons = screen.getAllByTitle(/remove-widget/i);
    await user.click(deleteWidgetButtons[0]);
    expect(mockContextValue.deleteWidget).toBeCalled();
  });
  it("hide show toggle", async () => {
    const user = userEvent.setup();
    renderStoreWidgetListComp();
    const hideButtons = screen.getAllByTitle(/hide/i);
    await user.click(hideButtons[0]);
    expect(mockContextValue.toggleHideUnHide).toBeCalled();
  });

  it("expand collapse ", async () => {
    const user = userEvent.setup();
    renderStoreWidgetListComp(false);
    const category1 = screen.getByText(/category 1/i);
    const widget1 = screen.getByText(/title 1/i);
    // initially widget1 present
    expect(widget1).toBeInTheDocument();
    // click to collapse the category
    await user.click(category1);
    expect(widget1).not.toBeInTheDocument();
    await user.click(category1);
    expect(screen.getByText(/title 1/i)).toBeInTheDocument();
  });
});
