import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import useWidgetAppContext from "@context/WidgetAppContext";
import MockRenderWithContext from "@utils/MockRenderWithContext";

describe("WidgetApp Context", () => {
  const TestComponent = () => {
    const { widgetList, handleAddNewWidget } = useWidgetAppContext();
    return (
      <div>
        {widgetList.map((widget) => (
          <div key={widget.categoryId}>{widget.category}</div>
        ))}
        <button
          onClick={() =>
            handleAddNewWidget({
              info: "Test Info",
              title: "Test Title",
              isNewCategory: true,
              newCategory: "Test Category",
              categoryId: "1",
            })
          }
        >
          Add New
        </button>
      </div>
    );
  };

  it("provide initial value correctly", () => {
    MockRenderWithContext(<TestComponent />);
    expect(screen.queryByText(/category 1/i)).toBeInTheDocument();
  });

  it("add new widget", async () => {
    const user = userEvent.setup();
    MockRenderWithContext(<TestComponent />);
    const addBtn = screen.getByRole("button", { name: /add new/i });
    await user.click(addBtn);
    // expect(screen.getByText(/test category/i)).toBeInTheDocument();
  });
});
