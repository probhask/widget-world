import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from "../TextArea";

describe("Text Area Component Test cases", () => {
  const renderTextArea = () =>
    render(
      <TextArea
        label="text area"
        handleOnChange={vi.fn()}
        error=" error found"
        placeholder="placeholder text"
        row={3}
        value="textarea"
      />
    );
  it("render text area", () => {
    renderTextArea();
    expect(
      screen.getByPlaceholderText(/placeholder text/i)
    ).toBeInTheDocument();
  });

  it("render error if passed", () => {
    renderTextArea();
    expect(screen.getByText(/error found/i)).toBeInTheDocument();
  });
});
