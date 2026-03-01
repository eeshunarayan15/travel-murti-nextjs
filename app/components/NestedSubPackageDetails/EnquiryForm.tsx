"use client";

import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = DOMPurify.sanitize(value.toString());
    });

    if (+data.adults < 1) {
      alert("At least one adult is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/enquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (res.ok) {
        alert("Enquiry submitted successfully!");
        e.currentTarget.reset();
      } else {
        alert("Failed to submit enquiry");
      }
    } catch {
      alert("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Full Name"
        required
        className="w-full px-3 py-2 border rounded text-sm"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full px-3 py-2 border rounded text-sm"
      />
      <input
        name="contactNo"
        placeholder="Contact No"
        required
        className="w-full px-3 py-2 border rounded text-sm"
      />
      <input
        name="country"
        placeholder="Country"
        required
        className="w-full px-3 py-2 border rounded text-sm"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          name="adults"
          type="number"
          placeholder="Adults"
          min="1"
          required
          className="px-3 py-2 border rounded text-sm"
        />
        <input
          name="children"
          type="number"
          placeholder="Children"
          min="0"
          defaultValue="0"
          className="px-3 py-2 border rounded text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          name="arrival"
          type="date"
          required
          className="px-3 py-2 border rounded text-sm"
        />
        <input
          name="departure"
          type="date"
          required
          className="px-3 py-2 border rounded text-sm"
        />
      </div>

      <textarea
        name="travelRequirement"
        placeholder="Travel Requirement"
        required
        rows={3}
        className="w-full px-3 py-2 border rounded text-sm resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
