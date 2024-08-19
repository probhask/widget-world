import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoreWidgetList from "../StoreWidgetList";
import MockRenderWithContext, {
  mockWidgetList,
} from "@utils/MockRenderWithContext";

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
  it("render delete category ", () => {
    renderStoreWidgetListComp();
    expect(screen.getAllByTitle(/delete-category/i).length).toBeGreaterThan(1);
  });
});
