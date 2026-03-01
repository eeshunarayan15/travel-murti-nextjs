// import { notFound } from "next/navigation";
// import Banner from "@/app/components/SubPackageDetails/Banner";
// import Description from "@/app/components/SubPackageDetails/Description";

// async function getNestedSubPackageDetails(
//   parentSlug: string,
//   subSlug: string,
//   nestedSlug: string,
// ) {
//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

//   try {
//     const res = await fetch(
//       `${API_URL}/subpackages/${parentSlug}/${subSlug}/${nestedSlug}`,
//       {
//         cache: "no-store",
//       },
//     );

//     if (!res.ok) return null;

//     const data = await res.json();
//     return data?.data ?? data;
//   } catch (error) {
//     console.error("Error fetching nested subpackage:", error);
//     return null;
//   }
// }

// export default async function NestedSubPackageDetailsPage({
//   params,
// }: {
//   params: Promise<{ parentSlug: string; subSlug: string; nestedSlug: string }>;
// }) {
//   const { parentSlug, subSlug, nestedSlug } = await params;
//   const subPackage = await getNestedSubPackageDetails(
//     parentSlug,
//     subSlug,
//     nestedSlug,
//   );

//   if (!subPackage) notFound();

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
//       <Banner subPackage={subPackage} />
//       <Description subPackage={subPackage} />
//     </div>
//   );
// }
import { notFound } from "next/navigation";
import GallerySlider from "@/app/components/NestedSubPackageDetails/GallerySlider";
import SubPackageTabs from "@/app/components/NestedSubPackageDetails/SubPackageTabs";
import PricingTable from "@/app/components/NestedSubPackageDetails/PricingTable";
import EnquiryForm from "@/app/components/NestedSubPackageDetails/EnquiryForm";

async function getNestedSubPackageDetails(subSlug: string, nestedSlug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  try {
    const res = await fetch(`${API_URL}/subpackages/${subSlug}/${nestedSlug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data ?? data;
  } catch (error) {
    console.error("Error fetching nested subpackage:", error);
    return null;
  }
}

export default async function NestedSubPackageDetailsPage({
  params,
}: {
  params: Promise<{ parentSlug: string; subSlug: string; nestedSlug: string }>;
}) {
  const { subSlug, nestedSlug } = await params;
  const data = await getNestedSubPackageDetails(subSlug, nestedSlug);

  if (!data) notFound();

  return (
    <div className="pt-32">
      {/* Banner */}
      <div
        className="relative w-full h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {data.name}
          </h1>
       <p className="text-sm text-gray-300 mt-1">Home {data.name}</p>

              </div>
              
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px]  mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <GallerySlider images={data.galleryImages} />
            <SubPackageTabs subPackage={data} />
            <PricingTable pricing={data.pricingDetails} />
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Enquiry Form
              </h3>
              <EnquiryForm />
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-700">
                  Looking for Help?
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  For Tour Packages, Vehicle Rental, and Customer Care Support
                </p>
                <p className="text-sm text-slate-700 mt-2">📞 +91 8527036496</p>
                <p className="text-sm text-slate-700">
                  ✉️ contact.travelmurti@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
