import { Phone, Mail, MapPin } from "lucide-react";
import NavbarClient from "./NavbarClient";

async function getPackages() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || data || [];
  } catch {
    return [];
  }
}

export default async function Navbar() {
  const packages = await getPackages();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-900 text-blue-200 text-xs py-1.5 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:8527036496"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" /> 8527036496
            </a>
            <a
              href="mailto:contact.travelmurti@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3" /> contact.travelmurti@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            <span>Noida, Uttar Pradesh</span>
          </div>
        </div>
      </div>
      <NavbarClient packages={packages} />
    </>
  );
}
