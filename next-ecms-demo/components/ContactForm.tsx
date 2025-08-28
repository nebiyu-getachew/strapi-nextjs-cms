"use client";

import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  careType: string;
  startDate: string;
  notes: string;
};

export default function ContactForm() {
  const [state, setState] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    careType: "Personal Care",
    startDate: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setStatus("sending");
      // TODO: wire to Strapi email/send endpoint or your inbox service
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
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
          value={state.notes}
          onChange={onChange}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Request Care"}
        </button>
        {status === "sent" && (
          <span className="ml-3 text-sm text-green-600">Thanks! We’ll be in touch soon.</span>
        )}
        {status === "error" && (
          <span className="ml-3 text-sm text-red-600">Something went wrong. Please try again.</span>
        )}
      </div>
    </form>
  );
}
