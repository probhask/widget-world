import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import DisplayWidget from "../DisplayWidget";
import { WidgetAppContext } from "@context/WidgetAppContext";
import { BrowserRouter } from "react-router-dom";
import MockRenderWithContext, {
  mockContextValue,
  mockWidgetList,
} from "@utils/MockRenderWithContext";

describe("DisplayWidget Component", () => {
  it("render widget's category title", () => {
    MockRenderWithContext(<DisplayWidget />);
    expect(screen.getByText(/category 1/i)).toBeInTheDocument();
  });
  it("render create-new", () => {
    MockRenderWithContext(<DisplayWidget />);
    expect(screen.getAllByTitle(/create-new/i).length).toEqual(
      mockWidgetList.length
    );
  });
  it("render widget's title and information", () => {
    MockRenderWithContext(<DisplayWidget />);
    const information = screen.getAllByText(/this is sample/i);
    expect(screen.getByText(/title 1/i)).toBeInTheDocument();
    expect(information.length > 0).toBeTruthy();
    information.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it("render hide button", () => {
    MockRenderWithContext(<DisplayWidget />);
    const hideButtons = screen.getAllByTitle(/hide/i);
    hideButtons.forEach((item) => expect(item).toBeInTheDocument());
  });
  it("hide button click hide func called", async () => {
    const user = userEvent.setup();
    MockRenderWithContext(<DisplayWidget />);
    const hideButtons = screen.getAllByTitle(/hide/i);

    await user.click(hideButtons[0]);

    expect(mockContextValue.toggleHideUnHide).toBeCalled();
  });

  it(" render info. msg. if widget item length is 0", () => {
    render(
      <BrowserRouter>
        <WidgetAppContext.Provider
          value={{ ...mockContextValue, widgetList: [] }}
        >
          <DisplayWidget />
        </WidgetAppContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/add some widget from store/i)).toBeInTheDocument();
  });
});
