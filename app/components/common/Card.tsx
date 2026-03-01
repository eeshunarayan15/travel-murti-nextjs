"use client";

import { formatTitle } from "@/app/utils/formatters";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

interface CardProps {
  imageUrl: string;
  title: string;
  description?: string;
  price?: number;
  duration?: string;
  onViewDetails?: () => void;
  isDealOfTheDay?: boolean;
  linkHref?: string;
}

export default function Card({
  imageUrl,
  title,
  description,
  price,
  duration,
  onViewDetails,
  isDealOfTheDay,
  linkHref,
}: CardProps) {
  const content = (
    <div className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-red-400 to-purple-500 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-[1px] bg-white rounded-2xl -z-10" />

      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {isDealOfTheDay && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            Deal of the Day
          </div>
        )}

        {duration && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-blue-600" />
            {duration}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-base font-bold text-slate-800 text-center line-clamp-1 group-hover:text-blue-600 transition-colors">
          {formatTitle(title)}
        </h2>

        {description && (
          <p className="text-sm text-slate-500 mt-2 text-center line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div>
            {typeof price === "number" && price > 0 ? (
              <>
                <p className="text-xs text-slate-400">Starting from</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{price.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400">
                    /Person
                  </span>
                </p>
              </>
            ) : (
              <p className="text-sm font-medium text-slate-400">Coming soon</p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 group-hover:gap-2.5"
          >
            View
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  if (linkHref) {
    return <Link href={linkHref}>{content}</Link>;
  }

  return <div onClick={onViewDetails}>{content}</div>;
}
