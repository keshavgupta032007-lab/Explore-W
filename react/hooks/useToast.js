import { useEffect, useRef, useState } from "react";

export function useToast(duration = 2000) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  function showToast(text) {
    setMessage(text);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), duration);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, visible, showToast };
}
