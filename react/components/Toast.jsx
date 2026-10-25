import { createPortal } from "react-dom";

export default function Toast({ message, visible }) {
  return createPortal(
    <div className={"toast" + (visible ? " show" : "")} role="status" aria-live="polite">
      {message}
    </div>,
    document.body
  );
}
