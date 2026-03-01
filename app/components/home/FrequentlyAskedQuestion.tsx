"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I book a tour?",
    a: "You can book directly through our website or contact us via phone/email.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made 15 days before departure get full refund.",
  },
  {
    q: "Do you provide customized tours?",
    a: "Yes, we offer fully customized tour packages based on your preferences.",
  },
];

export default function FrequentlyAskedQuestion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
              >
                <span className="font-semibold text-slate-800">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-slate-600 text-sm">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
