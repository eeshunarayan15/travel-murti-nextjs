"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroData = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730076611/kadarnath-transformed_n2uz2w.jpg",
    title: "Chardham Yatra Pilgrimage & Religious Tours",
    description: "Sacred Visit to Badrinath, Kedarnath, Gangotri & Yamunotri.",
    link: "/subpackages/6744b321b266c768dd5f7845",
  },
  {
    id: 2,
    image:
      "https://akshardham.com/gujarat/wp-content/uploads/2017/04/slider1.jpg",
    title: "Gujarat Tours Packages",
    description:
      "In Gujarat all temples are very famous for their worship and pilgrims.",
    link: "/subpackages/6744b36fb266c768dd5f786c",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730189561/southindiasliderimage_pkvwqf.avif",
    title: "South Indian Temple Tour",
    description: "Experience the spiritual essence of South India.",
    link: "/subpackages/6744b893b266c768dd5f7c53",
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-64px)] min-h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={1}
        className="w-full h-full"
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-[2px] bg-blue-400" />
                      <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                        Discover India
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>

                    <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl line-clamp-3">
                      {slide.description}
                    </p>

                    <Link href={slide.link}>
                      <button className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:gap-3">
                        Explore Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="hero-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="hero-next absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2" />

      <style jsx>{`
        .hero-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s;
          display: inline-block;
        }
        .hero-bullet-active {
          width: 28px;
          background: #fff;
        }
      `}</style>
    </section>
  );
}
