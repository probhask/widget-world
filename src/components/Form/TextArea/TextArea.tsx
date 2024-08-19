import ValidationError from "@components/ValidationError/ValidationError";
import React from "react";

type Props = {
  label: string;
  placeholder: string;
  disabled?: boolean;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  row: number;
  error: string;
};
const TextArea = React.memo(
  ({ label, value, handleOnChange, error, row, placeholder }: Props) => {
    return (
      <div className="flex gap-3 items-center justify-between  mid-tab:flex-col mid-tab:items-start w-full">
        <label
          htmlFor={`textarea-${label}`}
          className="text-[#674188] font-semibold"
        >
          {label}
        </label>
        <div className="mid-tab:w-full">
          <textarea
            id={`textarea-${label}`}
            rows={row}
            placeholder={placeholder}
            className="border-2 border-[#C8A1E0] text-[#674188] rounded outline-none px-1 resize-none overflow-auto w-[13rem] md:w-[16rem] mid-tab:w-full custom-scrollbar"
            value={value}
            onChange={handleOnChange}
          />

          {error && <ValidationError error={error} />}
        </div>
      </div>
    );
  }
);
TextArea.displayName = "TextArea";
export default TextArea;
