import { useEffect } from "react";
const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        if (
          event.target &&
          event.target.className &&
          typeof event.target.className === "string" &&
          event.target.className.indexOf("dontclose") > -1
        ) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
};
export default useOnClickOutside;
