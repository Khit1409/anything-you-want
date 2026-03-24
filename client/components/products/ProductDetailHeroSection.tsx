import Image from "next/image";

export default function ProductDetailHeroSection() {
  return (
    <div className="flex min-h-[400px] items-center bg-linear-to-r from-purple-300 to-purple-700 border border-gray-200">
      <div className="flex-1 px-12 py-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          Shop with Confidence
        </h1>
        <p className="mb-6 text-lg text-gray-600 max-w-xl">
          Experience world-class security and unbeatable value with every
          purchase
        </p>
        <p className="text-base text-gray-700 max-w-xl leading-relaxed">
          Our platform combines enterprise-grade security with competitive
          pricing to deliver the shopping experience you deserve.
        </p>
      </div>
      {/* Image */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          <Image
            src="/assets/images/product-hero.jpg"
            alt="Product showcase"
            width={350}
            height={350}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
