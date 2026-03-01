import { Shield, Award, HeadphonesIcon, Wallet } from "lucide-react";

const features = [
  { icon: Shield, title: "Safe & Secure", desc: "Your safety is our priority" },
  { icon: Award, title: "Best Prices", desc: "Competitive rates guaranteed" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Always here to help" },
  { icon: Wallet, title: "Easy Booking", desc: "Simple and quick process" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
