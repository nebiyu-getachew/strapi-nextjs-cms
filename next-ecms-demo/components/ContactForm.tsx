"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState({ name: "", phone: "", email: "", careType: "Personal Care", startDate: "", notes: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks! We received your request.");
    console.log("Request Care:", state);
  };

  const field = (k: keyof typeof state) => ({
    value: state[k],
    onChange: (e: any) => setState((s) => ({ ...s, [k]: e.target.value })),
  });

  return (
    <form onSubmit={onSubmit} className="card" style={{ padding: 20 }}>
      <div style={{ display: "grid", gap: 14 }}>
        <label><div style={{ fontWeight: 600, marginBottom: 6 }}>Full Name</div><input {...field("name")} required placeholder="Jane Doe" style={inputStyle}/></label>
        <label><div style={{ fontWeight: 600, marginBottom: 6 }}>Phone Number</div><input {...field("phone")} required placeholder="(555) 555-5555" style={inputStyle}/></label>
        <label><div style={{ fontWeight: 600, marginBottom: 6 }}>Email Address</div><input {...field("email")} required type="email" placeholder="you@example.com" style={inputStyle}/></label>
        <label><div style={{ fontWeight: 600, marginBottom: 6 }}>Type of Care Needed</div>
          <select {...field("careType")} style={inputStyle as any}>
            <option>Personal Care</option><option>Companionship</option><option>Meal Preparation</option><option>Medication Reminders</option><option>Light Housekeeping</option><option>Dementia & Alzheimer’s Care</option><option>Respite Care</option><option>24-Hour / Live-in Care</option>
          </select>
        </label>
        <label><div style={{ fontWeight: 600, marginBottom: 6 }}>Preferred Start Date</div><input {...field("startDate")} type="date" style={inputStyle}/></label>
        <label><div style={{ fontWeight: 600, marginBottom: 6 }}>Additional Notes</div><textarea {...field("notes")} rows={5} placeholder="Anything we should know?" style={inputStyle}/></label>
        <div><button className="btn" type="submit">Request Care</button></div>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8dbe2", outline: "none", background: "#fff" };
