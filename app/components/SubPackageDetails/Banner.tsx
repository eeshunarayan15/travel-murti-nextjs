import Link from "next/link";
import { ChevronRight, Clock, Tag } from "lucide-react";

interface BannerProps {
  subPackage: {
    imageUrl: string;
    name: string;
    isDealOfTheDay?: boolean;
    duration?: string;
    price?: number;
  };
}

export default function Banner({ subPackage }: BannerProps) {
  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      <img
        src={subPackage.imageUrl}
        alt={subPackage.name}
        className="w-full h-full object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-8 md:pb-12">
        {subPackage.isDealOfTheDay && (
          <div className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
            <Tag className="w-3 h-3" />
            Deal of the Day
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
          {subPackage.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mt-3">
          {subPackage.duration && (
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
              <Clock className="w-3.5 h-3.5" />
              {subPackage.duration}
            </div>
          )}
          {subPackage.price && (
            <div className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Starting ₹{Number(subPackage.price).toLocaleString()}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-white/70 text-xs mt-3">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/90">{subPackage.name}</span>
        </div>
      </div>
    </div>
  );
}
