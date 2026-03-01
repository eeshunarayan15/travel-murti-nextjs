"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Amazing experience! The tour was well organized and the guide was very knowledgeable.",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Best travel agency! They took care of everything and made our trip memorable.",
  },
  {
    name: "Amit Patel",
    rating: 5,
    text: "Highly recommended! Professional service and great value for money.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Real experiences from real travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-6 bg-slate-50 rounded-2xl">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 mb-4">{testimonial.text}</p>
              <p className="font-semibold text-slate-800">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
