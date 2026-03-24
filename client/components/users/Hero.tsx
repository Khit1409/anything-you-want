import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="hero-bg-img relative min-h-screen overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Main heading */}
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Welcome to
              </span>
              <span className="block mt-2 bg-linear-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                Our Premium Store
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              Discover an exquisite collection curated just for you. Where
              quality meets elegance, and every purchase tells a story of
              craftsmanship and dedication.
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                href={"#product-section"}
                className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faTruckFast}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  Shop Now
                </span>
              </Link>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="relative space-y-6">
            {/* Card 1 */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>

              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon
                    icon={faTruckFast}
                    className="text-white text-xl"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Fast & Free Delivery
                </h3>

                <p className="text-white/60 leading-relaxed">
                  Experience lightning-fast shipping on all orders. We ensure
                  your products arrive safely and swiftly, right at your
                  doorstep.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl ml-12">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>

              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Premium Quality
                </h3>

                <p className="text-white/60 leading-relaxed">
                  Every item in our collection is handpicked and verified for
                  excellence. We believe in delivering nothing but the best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
