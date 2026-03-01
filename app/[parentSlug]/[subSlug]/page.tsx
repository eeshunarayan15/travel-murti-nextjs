import { notFound } from "next/navigation";
import Banner from "@/app/components/SubPackageDetails/Banner";
import Description from "@/app/components/SubPackageDetails/Description";
import RelatedSubPackages from "@/app/components/SubPackageDetails/RelatedSubPackages";

async function getSubPackageDetails(packageSlug: string, subSlug: string) {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  try {
    const res = await fetch(
      `${API_URL}/subpackages/${packageSlug}/${subSlug}`,
      {
        cache: "no-store", // Changed from revalidate for testing
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    const subPackage = data?.data ?? data;

    if (subPackage.subPackages?.length > 0) {
      const related = await Promise.all(
        subPackage.subPackages.map(async (id: string) => {
          const relRes = await fetch(`${API_URL}/subpackages/${id}`, {
            cache: "no-store",
          });
          const relData = await relRes.json();
          return relData?.data ?? relData;
        }),
      );
      subPackage.relatedSubPackages = related;
    } else {
      subPackage.relatedSubPackages = [];
    }

    return subPackage;
  } catch (error) {
    console.error("Error fetching subpackage:", error);
    return null;
  }
}

export default async function SubPackageDetailsPage({
  params,
}: {
  params: Promise<{ parentSlug: string; subSlug: string }>;
}) {
  const { parentSlug, subSlug } = await params;
  const subPackage = await getSubPackageDetails(parentSlug, subSlug);

  if (!subPackage) notFound();

  return (
    <div className="container pt-32 mx-auto py-12 px-4 md:px-6">
      <Banner subPackage={subPackage} />
      <Description subPackage={subPackage} />
      <RelatedSubPackages
        subPackages={subPackage.relatedSubPackages}
        currentPackageSlug={parentSlug}
        currentSubSlug={subSlug}
      />
    </div>
  );
}
