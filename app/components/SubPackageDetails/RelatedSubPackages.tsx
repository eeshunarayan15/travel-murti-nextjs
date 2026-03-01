"use client";

import { useRouter } from "next/navigation";
import Card from "@/app/components/common/Card";


interface SubPackage {
  _id: string;
  imageUrl: string;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
  subPackageUrl?: string;
  isDealOfTheDay?: boolean;
}

interface RelatedSubPackagesProps {
  subPackages?: SubPackage[];
  currentPackageSlug?: string;
  currentSubSlug?: string;
}

export default function RelatedSubPackages({
  subPackages = [],
  currentPackageSlug,
  currentSubSlug,
}: RelatedSubPackagesProps) {
  const router = useRouter();

  const buildNestedUrl = (pkg: SubPackage) => {
    if (pkg.subPackageUrl) {
      const segments = pkg.subPackageUrl.replace(/^\//, "").split("/");

      if (segments.length >= 3) {
        return `/${segments.join("/")}`;
      }

      if (segments.length === 2 && currentPackageSlug) {
        return `/${currentPackageSlug}/${segments.join("/")}`;
      }

      if (segments.length === 1 && currentPackageSlug && currentSubSlug) {
        return `/${currentPackageSlug}/${currentSubSlug}/${segments[0]}`;
      }
    }

    return `/subpackages/${pkg._id}`;
  };

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-2">
        Related Sub-Packages
      </h2>

      <hr className="border-2 border-blue-500 w-40 mx-auto mb-8" />

      {subPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0">
          {subPackages.map((pkg) => (
            <Card
              key={pkg._id}
              imageUrl={pkg.imageUrl}
              title={pkg.name}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              isDealOfTheDay={pkg.isDealOfTheDay}
              onViewDetails={() => {
                const url = buildNestedUrl(pkg);
                console.log("Navigating to:", url);
                router.push(url);
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No related sub-packages found.
        </p>
      )}
    </>
  );
}
