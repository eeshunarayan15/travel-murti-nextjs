import { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import DealOfTheDay from "./components/home/DealOfTheDay";
import SpiritualSubPackages from "./components/home/SpiritualSubPackages";
import LatestTourPackages from "./components/home/LatestTourPackages";
import UnescoWorldHeritageSites from "./components/home/UnescoWorldHeritageSites";
import Testimonials from "./components/home/Testimonials";
import RelatedBlogs from "./components/home/RelatedBlogs";
import WhyChooseUs from "./components/home/WhyChooseUs";
import FrequentlyAskedQuestion from "./components/home/FrequentlyAskedQuestion";
import TripPlannerModal from "./components/home/TripPlannerModal";

export const metadata: Metadata = {
  title:
    "Travel Murti - Best Tour Packages in India | Spiritual & Holiday Tours",
  description:
    "Explore India with Travel Murti. Book Chardham Yatra, Kashmir Tours, Kerala Packages, and more. Best deals on spiritual and holiday tour packages.",
  keywords:
    "travel india, tour packages, chardham yatra, kashmir tour, kerala packages, spiritual tours, holiday packages",
  openGraph: {
    title: "Travel Murti - Best Tour Packages in India",
    description:
      "Explore India with Travel Murti. Book Chardham Yatra, Kashmir Tours, Kerala Packages, and more.",
    type: "website",
    url: "https://travelmurti.com",
  },
};

// Server-side data fetching
async function getHomeData() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  try {
    const [dealsRes, latestRes, spiritualRes] = await Promise.all([
      fetch(`${API_URL}/subpackages/deal-of-the-day`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_URL}/subpackages/latest`, { next: { revalidate: 3600 } }),
      fetch(`${API_URL}/subpackages/package/spiritual-tour`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const deals = dealsRes.ok ? (await dealsRes.json())?.data || [] : [];
    const latest = latestRes.ok ? (await latestRes.json())?.data || [] : [];
    const spiritual = spiritualRes.ok
      ? (await spiritualRes.json())?.data || []
      : [];

    return { deals, latest, spiritual };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { deals: [], latest: [], spiritual: [] };
  }
}

export default async function HomePage() {
  const { deals, latest, spiritual } = await getHomeData();

  return (
    <div className="pt-32">
      <TripPlannerModal />
      <HeroSection />
      <DealOfTheDay deals={deals} />
      <SpiritualSubPackages packages={spiritual} />
      <LatestTourPackages packages={latest} />
      <UnescoWorldHeritageSites />
      <Testimonials />
      <RelatedBlogs />
      <WhyChooseUs />
      <FrequentlyAskedQuestion />
    </div>
  );
}
