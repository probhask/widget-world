import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

type Props = {
  error: string;
};

const ValidationError = React.memo(({ error }: Props) => {
  return (
    <p className="text-xs font-semibold w-full px-1 text-red-600 flex items-center gap-2  overflow-clip text-clip line-clamp-1">
      <AiOutlineInfoCircle />
      {error}
    </p>
  );
});

ValidationError.displayName = "ValidationError";

export default ValidationError;
