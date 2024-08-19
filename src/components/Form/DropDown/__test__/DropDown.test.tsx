import { describe, it, expect, vi } from "vitest";
import { configure, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DropDown from "../DropDown";
import { CATEGORY } from "types/index";
import MockRenderWithContext, {
  mockWidgetList,
} from "@utils/MockRenderWithContext";

const mockCategory: CATEGORY | null = {
  category: "category 1",
  categoryId: "test Id",
};
const mockHandleChooseCategory = vi.fn();
const renderDropDown = (
  categoryParam: CATEGORY | null = mockCategory,
  error: string = "error founds"
) => (
  <DropDown
    category={categoryParam}
    error={error}
    handleChooseCategory={mockHandleChooseCategory}
  />
);

describe("DropDown Component Test Case", () => {
  it("render DropDown Component", () => {
    MockRenderWithContext(renderDropDown(null));
    expect(screen.getByText(/choose/i)).toBeInTheDocument();
  });
  it("render error text ", () => {
    MockRenderWithContext(renderDropDown(null));
    expect(screen.getByText(/error found/i)).toBeInTheDocument();
  });

  it("at initial dropdown default text to be 'select category'", () => {
    MockRenderWithContext(renderDropDown(null));
    expect(screen.getByText(/select category/i)).toBeInTheDocument();
  });

  it("if category selected ", () => {
    MockRenderWithContext(renderDropDown(mockCategory));
    expect(screen.getByText(/category 1/i)).toBeInTheDocument();
  });

  it("dropdown expand collapse btn ", () => {
    MockRenderWithContext(renderDropDown());
    expect(screen.getByTitle(/expand-collapse/i)).toBeInTheDocument();
  });

  describe("dropdown functionality", () => {
    it("onclick dropdown btn dropdown open", async () => {
      configure({ testIdAttribute: "class" });
      const user = userEvent.setup();
      MockRenderWithContext(renderDropDown());
      const dropBtn = screen.getByTitle(/expand-collapse/i);
      expect(dropBtn).toBeInTheDocument();
      await user.click(dropBtn);
      //   mockWidgetList.flatMap((item) => item).length + 1;
      //   +1 because it has add new too
      expect(screen.getAllByTestId(/dropdown-item/i).length).toEqual(
        mockWidgetList.flatMap((item) => item).length + 1
      );
    });

    it("onclick outside dropdown it close", async () => {
      configure({ testIdAttribute: "class" });
      const user = userEvent.setup();
      MockRenderWithContext(renderDropDown());
      const dropBtn = screen.getByTitle(/expand-collapse/i);
      expect(dropBtn).toBeInTheDocument();
      await user.click(dropBtn);

      expect(screen.getAllByTestId(/dropdown-item/i).length).toEqual(
        mockWidgetList.flatMap((item) => item).length + 1
      );
      const labelText = screen.getByText(/choose category/i).parentElement;
      if (labelText) {
        await user.click(labelText);
        expect(screen.queryByTestId(/dropdown-item/i)).not.toBeInTheDocument();
      }
    });
    it("handle choose category called on click of item", async () => {
      configure({ testIdAttribute: "class" });
      const user = userEvent.setup();
      MockRenderWithContext(renderDropDown());
      const dropBtn = screen.getByTitle(/expand-collapse/i);
      await user.click(dropBtn);
      const dropDownItems = screen.getAllByTestId(/dropdown-item/i);
      await user.click(dropDownItems[2]);
      expect(mockHandleChooseCategory).toBeCalled();
    });
    it("on item click dropdown close", async () => {
      configure({ testIdAttribute: "class" });
      const user = userEvent.setup();
      MockRenderWithContext(renderDropDown());
      const dropBtn = screen.getByTitle(/expand-collapse/i);
      await user.click(dropBtn);
      const dropDownItems = screen.getAllByTestId(/dropdown-item/i);
      await user.click(dropDownItems[2]);
      expect(mockHandleChooseCategory).toBeCalled();
      expect(screen.queryByText(/add new/i)).not.toBeInTheDocument();
    });
    //   todo choose add new test this not match
    it("choose add new", async () => {
      configure({ testIdAttribute: "class" });
      const user = userEvent.setup();
      MockRenderWithContext(renderDropDown());
      const dropBtn = screen.getByTitle(/expand-collapse/i);
      await user.click(dropBtn);
      const dropDownItems = screen.getAllByTestId(/dropdown-item/i);

      await user.click(dropDownItems[dropDownItems.length - 1]);

      expect(mockHandleChooseCategory).toBeCalledWith("+ Add new", "new");

      //
      //   expect(screen.getByText(/add new/i)).toBeInTheDocument();
    });
  });
});
