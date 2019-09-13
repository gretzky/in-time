import { useRef, useEffect } from "react";

const useInterval = (cb: (e?: any) => void, delay: number): void => {
  const savedCb = useRef<any>();

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => {
      savedCb.current();
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
