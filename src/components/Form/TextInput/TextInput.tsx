import ValidationError from "@components/ValidationError/ValidationError";
import React from "react";

type Props = {
  label: string;
  placeholder: string;
  disabled?: boolean;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};
const TextInput = React.memo(
  ({ disabled, error, handleOnChange, value, label, placeholder }: Props) => {
    return (
      <div className="flex gap-3 items-center justify-between flex-wrap mid-tab:flex-col mid-tab:items-start w-full">
        <label
          htmlFor={`input-${label}`}
          className="text-[#674188] font-semibold"
        >
          {label}
        </label>
        <div className="mid-tab:w-full w-[13rem]   md:w-[16rem] ">
          <input
            type="text"
            id={`input-${label}`}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
            className="border-2 border-[#C8A1E0] text-[#674188] rounded outline-none px-1 mid-tab:w-full w-[13rem]  md:w-[16rem]"
          />
          {error && <ValidationError error={error} />}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
