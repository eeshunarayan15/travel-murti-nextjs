import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Our Services</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="/spiritual-tours"
                  className="hover:text-white transition"
                >
                  Spiritual Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/holiday-tours"
                  className="hover:text-white transition"
                >
                  Holiday Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/weekend-tours"
                  className="hover:text-white transition"
                >
                  Weekend Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Legal</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <div className="h-1 w-10 bg-blue-500 rounded mb-4"></div>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="tel:+918527036496" className="hover:text-white">
                  +91 8527036496
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a
                  href="mailto:contact.travelmurti@gmail.com"
                  className="hover:text-white"
                >
                  contact.travelmurti@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 my-6"></div>
        <div className="text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Travel Murti. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
