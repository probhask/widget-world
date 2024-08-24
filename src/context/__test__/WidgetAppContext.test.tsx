import { describe, expect, it, vi } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import useWidgetAppContext from "@context/WidgetAppContext";
import MockRenderWithContext, {
  mockContextValue,
  mockWidgetList,
} from "@utils/MockRenderWithContext";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";

describe("WidgetApp Context", () => {
  const TestComponent = () => {
    const {
      widgetList,
      handleAddNewWidget,
      deleteCategory,
      deleteWidget,
      toggleHideUnHide,
    } = useWidgetAppContext();
    return (
      <div>
        {widgetList.map((widget) => (
          <div key={widget.categoryId}>
            <div>{widget.category}</div>
            <button onClick={() => deleteCategory(widget.categoryId)}>
              delete category {widget.categoryId}
            </button>
            <div>
              {widget.data.map((item) => (
                <div key={item.id}>
                  <div>{item.title}</div>
                  <div>{item.info}</div>
                  <div onClick={() => toggleHideUnHide(item.id)}>
                    {item.hide
                      ? `${item.id} is hidden`
                      : `${item.id} is visible`}
                  </div>
                  <button onClick={() => deleteWidget(item.id)}>
                    delete widget {item.id}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            handleAddNewWidget({
              info: "Test Info",
              title: "Test Title",
              isNewCategory: true,
              newCategory: "Test New Category",
              categoryId: "1",
            })
          }
        >
          Add New Widget With category
        </button>
      </div>
    );
  };

  it("if context hook useWidgetAppContext used outside context give error", () => {
    expect(() => renderHook(() => useWidgetAppContext())).toThrowError(
      /useWidgetAppContext must be used within WidgetAppContextProvider/i
    );
  });
  it("provide initial value correctly", () => {
    MockRenderWithContext(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    expect(screen.queryByText(/category 1/i)).toBeInTheDocument();
  });

  it("delete category", async () => {
    const user = userEvent.setup();
    MockRenderWithContext(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    const delBtnCategory1 = screen.getByRole("button", {
      name: `delete category ${mockWidgetList[0].categoryId}`,
    });
    await user.click(delBtnCategory1);
    expect(mockContextValue.deleteCategory).toBeCalled();
  });

  it("add new widget with category", async () => {
    const user = userEvent.setup();
    MockRenderWithContext(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    const addBtn = screen.getByRole("button", {
      name: /Add New Widget With category/i,
    });
    await user.click(addBtn);
    // expect(screen.getByText(/test category/i)).toBeInTheDocument();
  });

  // it("toggle hide ubHide", async () => {
  //   mockContextValue.toggleHideUnHide(
  //     mockContextValue.widgetList[0].data[0].id
  //   );
  //   expect(mockContextValue.widgetList[0].data[0].hide).toBe(true);
  // });
});
