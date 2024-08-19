import { WidgetAppContext } from "@context/WidgetAppContext";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

export const mockWidgetList = [
  {
    categoryId: "05da964f-f8a0-4180-a5fe-28c71a839071",
    category: "category 1",
    data: [
      {
        id: "8a1eadaa-23a4-45f1-8774-1dad5649285a",
        title: "title 1",
        info: "this is sample",
        hide: false,
      },
      {
        id: "4b2a507e-a359-4bb5-bae6-1d423d1260ef",
        title: "title 2",
        info: "this is sample",
        hide: false,
      },
      {
        id: "094b3121-efb0-43c8-8b3b-420daa90ab2c",
        title: "Title 3",
        info: "sample ",
        hide: false,
      },
    ],
  },
  {
    categoryId: "8932b113-9e0e-4c65-9804-95a696c32680",
    category: "Category X",
    data: [
      {
        id: "094b3121-efb0-43c8-8b3b-420daa90ab2c",
        title: "Title X1",
        info: "sample ",
        hide: false,
      },
    ],
  },
];
export const mockContextValue = {
  widgetList: mockWidgetList,
  handleAddNewWidget: vi.fn(),
  deleteWidget: vi.fn(),
  deleteCategory: vi.fn(),
  toggleHideUnHide: vi.fn(),
  handleSearch: vi.fn(),
};

const MockRenderWithContext = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <WidgetAppContext.Provider value={mockContextValue}>
        {component}
      </WidgetAppContext.Provider>
    </BrowserRouter>
  );
};
export default MockRenderWithContext;
