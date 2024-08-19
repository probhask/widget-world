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

  // todo test all functionality
  // it("render hide and show btn  ", async () => {
  //   const user = userEvent.setup();
  //   renderStoreWidgetListComp();
  //   const hideBtn = screen.queryAllByTitle(/hide/i);
  //   const showBtn = screen.queryAllByTitle(/show/i);
  //   expect(hideBtn.length).toBeDefined();
  //   expect(showBtn.length).toBeDefined();

  //   await user.click(hideBtn[0]);
  //   const hideBtnAfterClick = await screen.findAllByTitle(/hide/i);
  //   expect(hideBtnAfterClick.length).toBe(hideBtn.length - 1);
  // });
  // it("render delete category click category length -1", async () => {
  //   const user = userEvent.setup();
  //   renderStoreWidgetListComp();
  //   const deleteCategoryBtn = screen.getAllByTitle(/delete-category/i);
  //   console.log(deleteCategoryBtn.length);

  //   await user.click(deleteCategoryBtn[0]);
  //   console.log(deleteCategoryBtn.map((item) => item.textContent));

  //   expect(screen.getAllByTitle(/delete-category/i).length).toBe(
  //     deleteCategoryBtn.length - 1
  //   );
  // });
});
