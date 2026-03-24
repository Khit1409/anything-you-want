import { ProductReviews } from "@/interfaces/response/product.response";
import Image from "next/image";
import { useState } from "react";

interface Props {
  reviews: Array<ProductReviews>;
}
export default function ProductReview({ reviews }: Props) {
  const [slice, setSlice] = useState<number>(2);
  
  const watchMore = () => {
    setSlice(reviews.length);
  };
  const watchLess = () => {
    setSlice(2);
  };

  return (
    <section id="product-reviews" className="my-6 pt-6 px-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Đánh giá của khách hàng
        </h2>
        <p className="text-sm text-gray-500 mt-1">{reviews.length} đánh giá</p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.slice(0, slice).map((review, index) => (
          <div
            key={index}
            className="pb-6 border-b border-gray-100 last:border-b-0"
          >
            {/* Reviewer Info */}
            <div className="mb-3">
              <strong className="text-base text-gray-900">{review.name}</strong>
              <div className="text-sm text-gray-500 mt-1">{review.email}</div>
            </div>

            {/* Comment */}
            <p className="text-gray-700 leading-relaxed mb-4">
              {review.comment}
            </p>

            {/* Review Images */}
            {review.imgs.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {review.imgs.map((img, imgIndex) => (
                  <div key={imgIndex} className="overflow-hidden bg-gray-100">
                    <Image
                      loading="lazy"
                      src={img}
                      alt={`Review image ${imgIndex + 1}`}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 2 && (
        <div className="w-full flex items-center justify-center mt-6 pt-4">
          <button
            className="px-6 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
            onClick={() => {
              if (slice === 2) {
                watchMore();
              } else {
                watchLess();
              }
            }}
          >
            {slice === 2 ? "Xem thêm đánh giá" : "Ẩn bớt"}
          </button>
        </div>
      )}
    </section>
  );
}
