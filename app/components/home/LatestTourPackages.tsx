import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import Card from "../common/Card";

interface Package {
  _id: string;
  imageUrl: string;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
  subPackageUrl?: string;
}

export default function LatestTourPackages({
  packages,
}: {
  packages: Package[];
}) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-green-500 uppercase">
                New Arrivals
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Latest Tour Packages
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Explore our newest destinations and experiences
            </p>
          </div>

          <Link
            href="/packages"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0 group"
          >
            View All Packages
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.slice(0, 8).map((pkg) => (
            <Card
              key={pkg._id}
              imageUrl={pkg.imageUrl}
              title={pkg.name}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              linkHref={pkg.subPackageUrl || `/subpackages/${pkg._id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
