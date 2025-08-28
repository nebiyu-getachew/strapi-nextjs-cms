"use client";

import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  careType: string;
  startDate: string;
  notes: string;
  company?: string; // honeypot, must stay empty
};

export default function ContactForm() {
  const [state, setState] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    careType: "Personal Care",
    startDate: "",
    notes: "",
    company: "",
  });

  const [status, setStatus] =
    useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  function validate(): string | null {
    if (!state.name.trim()) return "Please enter your full name.";
    if (!state.phone.trim()) return "Please enter a phone number.";
    if (!state.email.trim()) return "Please enter an email address.";
    if (!/^\S+@\S+\.\S+$/.test(state.email))
      return "Please enter a valid email.";
    if (state.company) return "Bot detected."; // honeypot filled
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const err = validate();
    if (err) {
      setStatus("error");
      setMessage(err);
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          phone: state.phone,
          email: state.email,
          careType: state.careType,
          startDate: state.startDate,
          notes: state.notes,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus("sent");
      setMessage("Thanks! We received your request and will contact you shortly.");
      setState({
        name: "",
        phone: "",
        email: "",
        careType: state.careType, // keep the selection
        startDate: "",
        notes: "",
        company: "",
      });
    } catch {
      setStatus("error");
      setMessage("Sorry, something went wrong. Please try again or call us.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-live="polite">
      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          value={state.company}
          onChange={onChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Full Name */}
      <div className="grid gap-1.5">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="input-solid"
          value={state.name}
          onChange={onChange}
          required
        />
      </div>

      {/* Phone */}
      <div className="grid gap-1.5">
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="input-solid"
          value={state.phone}
          onChange={onChange}
          required
        />
      </div>

      {/* Email */}
      <div className="grid gap-1.5">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input-solid"
          value={state.email}
          onChange={onChange}
          required
        />
      </div>

      {/* Care Type */}
      <div className="grid gap-1.5">
        <label htmlFor="careType" className="form-label">Type of Care Needed</label>
        <select
          id="careType"
          name="careType"
          className="select-solid"
          value={state.careType}
          onChange={onChange}
        >
          <option>Personal Care</option>
          <option>Companionship</option>
          <option>Meal Preparation</option>
          <option>Medication Reminders</option>
          <option>Light Housekeeping</option>
          <option>Dementia &amp; Alzheimer’s Care</option>
          <option>Respite Care</option>
          <option>24-Hour / Live-in Care</option>
        </select>
      </div>

      {/* Start Date */}
      <div className="grid gap-1.5">
        <label htmlFor="startDate" className="form-label">Preferred Start Date</label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          className="input-solid"
          value={state.startDate}
          onChange={onChange}
        />
      </div>

      {/* Notes */}
      <div className="grid gap-1.5">
        <label htmlFor="notes" className="form-label">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          className="textarea-solid"
          rows={5}
          value={state.notes}
          onChange={onChange}
          placeholder="Anything we should know?"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          // Use Tailwind so it’s visible even if btn-primary isn’t defined
          className="rounded-lg bg-sky-700 px-5 py-2.5 font-medium text-white shadow hover:bg-sky-800 disabled:opacity-50"
          disabled={status === "sending" || status === "sent"}
          aria-label="Request Care"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Request Care"}
        </button>

        {message && (
          <span
            className={`ml-3 text-sm ${
              status === "sent"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : "text-zinc-700"
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
