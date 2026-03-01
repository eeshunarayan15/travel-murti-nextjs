import { Landmark } from "lucide-react";

const sites = [
  {
    name: "Taj Mahal",
    location: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
  },
  {
    name: "Red Fort",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
  },
  {
    name: "Qutub Minar",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce",
  },
  {
    name: "Hampi",
    location: "Karnataka",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001",
  },
];

export default function UnescoWorldHeritageSites() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Landmark className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
              Heritage Sites
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            UNESCO World Heritage Sites
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Explore India's rich cultural and historical landmarks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sites.map((site) => (
            <div
              key={site.name}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{site.name}</h3>
                <p className="text-sm text-gray-300">{site.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
