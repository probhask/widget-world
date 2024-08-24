import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MockRenderWithContext from "@utils/MockRenderWithContext";
import Search from "../Search";
import SearchBar from "../SearchBar/SearchBar";

describe("search comp test case", () => {
  const renderSearchComp = () => MockRenderWithContext(<Search />);
  it("render search comp", () => {
    renderSearchComp();
  });
  it("at initial render text 'search widget's' ", () => {
    renderSearchComp();
    expect(screen.getByText(/search widget's/i)).toBeInTheDocument();
  });
  describe("search bar test case", () => {
    const mockGetUrlSearchParam = vi.fn();
    const mockSetUrlSearchParam = vi.fn();
    const mockHandleOnSubmit = vi.fn();
    const mockHandleReset = vi.fn();
    const renderSearchBar = () =>
      MockRenderWithContext(
        <SearchBar
          getUrlSearchParam={mockGetUrlSearchParam}
          handleOnSubmit={mockHandleOnSubmit}
          handleReset={mockHandleReset}
          setUrlSearchParam={mockSetUrlSearchParam}
        />
      );
    it("render searchBar", () => {
      renderSearchBar();
      expect(
        screen.getByPlaceholderText(/enter widget title/i)
      ).toBeInTheDocument();
    });
    it("search and clear btn", () => {
      renderSearchBar();
      expect(screen.getByTitle(/search/i)).toBeInTheDocument();
      expect(screen.getByTitle(/clear/i)).toBeInTheDocument();
    });

    it(" searchBar input onchange", async () => {
      const user = userEvent.setup();
      renderSearchBar();
      const inputBox = screen.getByPlaceholderText(/enter widget title/i);
      await user.type(inputBox, "title");
      expect(mockSetUrlSearchParam).toBeCalledWith("title");
    });
    it("handleSubmit and handleReset function", async () => {
      const user = userEvent.setup();
      renderSearchBar();
      const searchBtn = screen.getByTitle(/search/i);
      const clearBtn = screen.getByTitle(/clear/i);
      await user.click(searchBtn);
      expect(mockHandleOnSubmit).toBeCalled();
      await user.click(clearBtn);
      expect(mockHandleReset).toBeCalled();
    });

    it("go back btn", async () => {
      renderSearchBar();
      const goBackBtn = screen.getByTitle(/go back/i);
      expect(goBackBtn).toBeInTheDocument();
    });
  });
});
