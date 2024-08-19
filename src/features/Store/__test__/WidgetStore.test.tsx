import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockRenderWithContext from "@utils/MockRenderWithContext";
import WidgetStore from "../WidgetStore";

describe("WidgetStore Component test case", () => {
  const renderWidgetStoreComp = () => MockRenderWithContext(<WidgetStore />);
  it("render Widget Store Comp", () => {
    renderWidgetStoreComp();
    expect(
      screen.getByRole("heading", { name: /Widget Store/i })
    ).toBeInTheDocument();
  });

  it("search and close btn", () => {
    renderWidgetStoreComp();
    expect(screen.getByTitle(/search/i)).toBeInTheDocument();
    expect(screen.getByTitle(/close/i)).toBeInTheDocument();
  });
});
