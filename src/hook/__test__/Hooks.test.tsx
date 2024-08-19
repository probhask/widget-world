import useWidget from "@hook/useWidget";
import { mockWidgetList } from "@utils/MockRenderWithContext";
import { describe, expect, it } from "vitest";

describe("useWidget hook test case", () => {
  const {
    addNewCategory,
    addNewWidget,
    hideToggle,
    removeCategory,
    removeWidget,
    searchWidget,
  } = useWidget();
  it("add new widget function", () => {
    const newList = addNewWidget(
      mockWidgetList,
      "test tile",
      "test info",
      true,
      "new",
      "test new category"
    );

    expect(newList[newList.length - 1].category).toBe("test new category");
  });
  it("add new category function", () => {
    const newList = addNewCategory(mockWidgetList, "test new category");

    expect(
      newList.newCategoryList[newList.newCategoryList.length - 1].category
    ).toBe("test new category");
  });
  it("remove category function", () => {
    const newList = removeCategory(
      mockWidgetList,
      "05da964f-f8a0-4180-a5fe-28c71a839071"
    );
    expect(newList.length).toBe(mockWidgetList.length - 1);
  });
  it("remove widget function", () => {
    const newList = removeWidget(
      mockWidgetList,
      "8a1eadaa-23a4-45f1-8774-1dad5649285a"
    );
    expect(newList[0].data.length).toBe(mockWidgetList[0].data.length - 1);
  });
  it("search Widget function", () => {
    const newList = searchWidget(mockWidgetList, "title 1");
    expect(newList.length).toBe(1);
  });
  it("hideToggle Widget function", () => {
    const beforeAction = mockWidgetList[0].data[0].hide;
    const newList = hideToggle(
      mockWidgetList,
      "8a1eadaa-23a4-45f1-8774-1dad5649285a"
    );

    expect(newList[0].data[0].hide).toBe(!beforeAction);
  });
});
