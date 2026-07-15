import Link from "next/link";
import Price from "./Price";
import { ProductInfoPreview } from "@/productInterfaces/read.interface";

export default function Info({ info, id }: { info: ProductInfoPreview; id: string }) {
  const { name, price, sale } = info;
  return (
    <div className="p-1">
      <Link
        href={`/products/${id}`}
        className="text-sm leading-tight text-(--title) dark:text-(--text) line-clamp-4 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer min-h-10"
      >
        {name}
      </Link>
      <Price price={price} sale={sale} />
    </div>
  );
}
