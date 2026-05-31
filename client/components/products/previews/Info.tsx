import { ProductInfo } from "@/interfaces";
import Link from "next/link";
import Price from "./Price";

export default function Info({ info, id }: { info: ProductInfo; id: string }) {
  const { brand, name, price, sale } = info;
  return (
    <div className="flex flex-col gap-3">
      {/* Brand */}
      <Link
        href={`/search?brand=${brand}`}
        className="text-xs text-(--muted) hover:text-orange-600 dark:hover:text-orange-400 hover:underline mb-1 block"
      >
        {brand}
      </Link>

      {/* Product Name */}
      <Link
        href={`/products/${id}`}
        className="text-xl leading-tight text-(--title) dark:text-(--text) line-clamp-4 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer min-h-10"
      >
        {name}
      </Link>

      {/* Price Section */}
      <Price price={price} sale={sale} />
    </div>
  );
}
