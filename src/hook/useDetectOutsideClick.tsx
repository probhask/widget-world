import { useEffect, useRef } from "react";

const useDetectOutsideClick = (
  callback: () => void
): React.RefObject<HTMLDivElement> => {
  const outsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(e.target as Node)
      ) {
        callback();
      }
    };
    window.addEventListener("mouseup", detectOutsideClick, true);
    window.addEventListener("touchend", detectOutsideClick, true);

    return () => {
      window.removeEventListener("click", detectOutsideClick, true);
      window.removeEventListener("touchend", detectOutsideClick, true);
    };
  }, [callback]);
  return outsideRef;
};

export default useDetectOutsideClick;
