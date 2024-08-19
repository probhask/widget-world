import React from "react";

type Props = {
  text: string;
  type: "submit" | "button" | "reset";
  className?: string;
};
const CreateNewButton = React.memo(({ className, text, type }: Props) => {
  return (
    <button
      type={type}
      className={`px-5 py-2 uppercase  active:scale-90 w-[100px] rounded transition-all ${className}`}
    >
      {text}
    </button>
  );
});
CreateNewButton.displayName = "CreateNewButton";
export default CreateNewButton;
