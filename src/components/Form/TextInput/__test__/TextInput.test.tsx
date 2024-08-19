import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "../TextInput";

describe("TextInput Component Test cases", () => {
  const renderTextInput = () =>
    render(
      <TextInput
        label="text Input"
        handleOnChange={vi.fn()}
        error=" error found"
        placeholder="placeholder text"
        value="textInput"
      />
    );
  it("render text Input", () => {
    renderTextInput();
    expect(
      screen.getByPlaceholderText(/placeholder text/i)
    ).toBeInTheDocument();
  });
  it("render label", () => {
    renderTextInput();
    expect(screen.getByLabelText(/text input/i)).toBeInTheDocument();
  });

  it("render error if passed", () => {
    renderTextInput();
    expect(screen.getByText(/error found/i)).toBeInTheDocument();
  });
});
