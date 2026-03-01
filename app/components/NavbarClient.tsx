"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";

export default function NavbarClient({ packages }) {
  const [subPackages, setSubPackages] = useState({});
  const [loading, setLoading] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const dropdownCloseTimer = useRef(null);
  const pathname = usePathname();

  const staticLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/blog", label: "Blog" },
  ];

  const isActivePage = (path) => pathname === path;

  const fetchSubPackages = useCallback(
    async (packageId) => {
      if (subPackages[packageId] || loading[packageId]) return;

      setLoading((prev) => ({ ...prev, [packageId]: true }));
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subpackages/package/${packageId}`,
        );
        const data = await res.json();
        const subs = data?.data ?? data;
        setSubPackages((prev) => ({
          ...prev,
          [packageId]: Array.isArray(subs) ? subs : [],
        }));
      } catch (err) {
        console.error("Failed to fetch sub-packages", err);
      } finally {
        setLoading((prev) => ({ ...prev, [packageId]: false }));
      }
    },
    [subPackages, loading],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const openDesktopDropdown = (pkgId) => {
    clearTimeout(dropdownCloseTimer.current);
    setOpenDropdown(pkgId);
    fetchSubPackages(pkgId);
  };

  const closeDesktopDropdown = () => {
    dropdownCloseTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const cancelDropdownClose = () => {
    clearTimeout(dropdownCloseTimer.current);
  };

  const toggleMobileDropdown = (pkgId) => {
    if (mobileDropdownOpen === pkgId) {
      setMobileDropdownOpen(null);
    } else {
      setMobileDropdownOpen(pkgId);
      fetchSubPackages(pkgId);
    }
  };

  const getDesktopLinkClass = (path) => {
    const base =
      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    const active = isActivePage(path);
    if (scrolled) {
      return `${base} ${active ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"}`;
    }
    return `${base} ${active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`;
  };

  const getDropdownButtonClass = (pkgId) => {
    const base =
      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    const isOpen = openDropdown === pkgId;
    if (scrolled) {
      return `${base} ${isOpen ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"}`;
    }
    return `${base} ${isOpen ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`;
  };

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "top-8 bg-white shadow-lg shadow-slate-200/50 border-b border-slate-100" : "top-8 bg-gradient-to-r from-blue-900 to-blue-800 shadow-md"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-colors ${scrolled ? "border-blue-100" : "border-white/20"}`}
          >
            <img
              src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg"
              alt="Travel Murti"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-bold text-lg transition-colors ${scrolled ? "text-slate-800" : "text-white"}`}
          >
            Travel Murti
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {staticLinks.map(({ to, label }) => (
            <Link key={to} href={to} className={getDesktopLinkClass(to)}>
              {label}
            </Link>
          ))}

          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="relative"
              onMouseEnter={() => openDesktopDropdown(pkg._id)}
              onMouseLeave={closeDesktopDropdown}
            >
              <button className={getDropdownButtonClass(pkg._id)}>
                {pkg.category}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === pkg._id ? "rotate-180" : ""}`}
                />
              </button>

              {openDropdown === pkg._id && (
                <div
                  className="absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                  onMouseEnter={cancelDropdownClose}
                  onMouseLeave={closeDesktopDropdown}
                >
                  {loading[pkg._id] && (
                    <div className="px-4 py-3 space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-3 bg-slate-100 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  )}
                  {!loading[pkg._id] &&
                    (subPackages[pkg._id] || []).length === 0 && (
                      <p className="px-4 py-3 text-sm text-slate-400">
                        No tours available
                      </p>
                    )}
                  {!loading[pkg._id] &&
                    (subPackages[pkg._id] || []).map((subPkg) => (
                      <Link
                        key={subPkg._id}
                        href={
                          subPkg.subPackageUrl || `/subpackages/${subPkg._id}`
                        }
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-300 group-hover:bg-blue-500 transition-colors shrink-0" />
                        {subPkg.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/contact" className={getDesktopLinkClass("/contact")}>
            Contact Us
          </Link>
          <Link
            href="/contact"
            className="ml-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            Book Now
          </Link>
        </nav>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img
                  src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg"
                  alt="Travel Murti"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="font-bold text-slate-800">Travel Murti</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {staticLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  href={to}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActivePage(to) ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  {label}
                </Link>
              ))}

              {packages.map((pkg) => (
                <div key={pkg._id}>
                  <button
                    onClick={() => toggleMobileDropdown(pkg._id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {pkg.category}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileDropdownOpen === pkg._id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {mobileDropdownOpen === pkg._id && (
                    <div className="ml-4 mt-1 mb-2 border-l-2 border-blue-100 pl-4 space-y-1">
                      {loading[pkg._id] && (
                        <div className="space-y-2 py-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="h-3 bg-slate-100 rounded animate-pulse"
                            />
                          ))}
                        </div>
                      )}
                      {/* {!loading[pkg._id] &&
                        (subPackages[pkg._id] || []).map((subPkg) => (
                          <Link
                            key={subPkg._id}
                            href={
                              subPkg.subPackageUrl ||
                              `/subpackages/${subPkg._id}`
                            }
                            className="block py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            {subPkg.name}
                          </Link>
                        ))} */}
                      {!loading[pkg._id] &&
                        (subPackages[pkg._id] || []).map((subPkg) => (
                          <Link
                            key={subPkg._id}
                            href={`/subpackages/${subPkg.slug}`} // ← Use slug, not ID
                            className="..."
                          >
                            {subPkg.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            <div className="p-4 border-t border-slate-100 space-y-3">
              <Link
                href="/contact"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl text-center transition-colors"
              >
                Book Now
              </Link>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <a
                  href="tel:8527036496"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Phone className="w-3 h-3" /> 8527036496
                </a>
                <a
                  href="mailto:contact.travelmurti@gmail.com"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Mail className="w-3 h-3" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
