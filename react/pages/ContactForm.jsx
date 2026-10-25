import { useState } from "react";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

const EMPTY_FORM = { name: "", email: "", message: "" };

function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email, e.g. you@example.com.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { message, visible, showToast } = useToast(2500);

  const errors = validateContact(values);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    showToast("Message sent — we’ll reply soon.");
    setValues(EMPTY_FORM);
    setSubmitAttempted(false);
  }

  const shown = submitAttempted ? errors : {};
  const inputProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    "aria-invalid": shown[name] ? "true" : "false",
    "aria-describedby": shown[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <>
      <form id="contact" noValidate onSubmit={handleSubmit}>
        <div className="ew-contact-field">
          <input {...inputProps("name")} placeholder="Name" autoComplete="name" aria-label="Name" />
          {shown.name && <p className="ew-error" id="contact-name-error" role="alert">{shown.name}</p>}
        </div>
        <div className="ew-contact-field">
          <input {...inputProps("email")} type="email" placeholder="Email" autoComplete="email" aria-label="Email" />
          {shown.email && <p className="ew-error" id="contact-email-error" role="alert">{shown.email}</p>}
        </div>
        <div className="ew-contact-field">
          <textarea {...inputProps("message")} placeholder="Message" aria-label="Message" />
          {shown.message && <p className="ew-error" id="contact-message-error" role="alert">{shown.message}</p>}
        </div>
        <button className="btn" type="submit">Send message</button>
      </form>
      <Toast message={message} visible={visible} />
    </>
  );
}
