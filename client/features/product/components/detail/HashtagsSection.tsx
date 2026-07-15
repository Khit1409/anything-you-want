import Link from "next/link";

export default function HashtagsSection({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-3">
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={`/products/search?tag=${tag}`}
          className="text-sm italic text-blue-500 hover:underline"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
