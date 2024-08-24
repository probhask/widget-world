import addNewWidgetFormValidation from "@utils/addNewWidgetValidation";
import { mockWidgetList } from "@utils/MockRenderWithContext";
import { describe, expect, it } from "vitest";

describe("addNewWidgetValidation function test cas ", () => {
  it("validation check", () => {
    const { result } = addNewWidgetFormValidation(
      mockWidgetList,
      { category: "new", categoryId: "new" },
      "test new category",
      { info: "test info", title: "title 1" }
    );
    expect(result).toBe(true);
  });
  it("title in this category already exist", () => {
    const { result, validationError } = addNewWidgetFormValidation(
      mockWidgetList,
      {
        category: "category 1",
        categoryId: "05da964f-f8a0-4180-a5fe-28c71a839071",
      },
      "",
      { info: "test info", title: "title 1" }
    );
    expect(result).toBe(false);
    expect(validationError.widgetTitle).toBe(
      "title already exist in this category"
    );
  });
  it("new  category required", () => {
    const { result, validationError } = addNewWidgetFormValidation(
      mockWidgetList,
      { category: "new", categoryId: "new" },
      "",
      { info: "test info", title: "test title" }
    );
    expect(result).toBe(false);
    expect(validationError.newCategory).toBe("required");
  });
  it("want to new category but category name given already already exist", () => {
    const { result, validationError } = addNewWidgetFormValidation(
      mockWidgetList,
      { category: "new", categoryId: "new" },
      "category 1",
      { info: "test info", title: "test title" }
    );
    expect(result).toBe(false);
    expect(validationError.newCategory).toBe(
      "category with this name already exist"
    );
  });
  it("new widget info required", () => {
    const { result, validationError } = addNewWidgetFormValidation(
      mockWidgetList,
      { category: "new", categoryId: "new" },
      "test new category",
      { info: "", title: "test title" }
    );
    expect(result).toBe(false);
    expect(validationError.widgetInfo).toBe("required");
  });
  it("new title info required", () => {
    const { result, validationError } = addNewWidgetFormValidation(
      mockWidgetList,
      { category: "new", categoryId: "new" },
      "test new category",
      { info: "test info", title: "" }
    );
    expect(result).toBe(false);
    expect(validationError.widgetTitle).toBe("required");
  });
  it("category required", () => {
    const { result, validationError } = addNewWidgetFormValidation(
      mockWidgetList,
      null,
      "test new category",
      { info: "test info", title: "test title" }
    );
    expect(result).toBe(false);
    expect(validationError.chooseCategory).toBe("choose category");
  });
});
