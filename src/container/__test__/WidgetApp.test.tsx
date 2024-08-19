import { describe, it } from "vitest";
import "@testing-library/jest-dom";
import WidgetApp from "@container/WidgetApp";
import MockRenderWithContext from "@utils/MockRenderWithContext";

describe("Widget App Component test case", () => {
  const renderWidgetApp = () => MockRenderWithContext(<WidgetApp />);
  it("render Widget App Comp", () => {
    renderWidgetApp();
  });
});
