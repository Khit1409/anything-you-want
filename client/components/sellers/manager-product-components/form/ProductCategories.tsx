import { Categories } from "@/interfaces/category.interface";

type Props = {
  categories: Categories;
  isSelectedCategory: (category: string) => boolean;
};

export default function ProductCategories({
  categories,
  isSelectedCategory,
}: Props) {
  if (!categories || categories.length === 0)
    return (
      <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
        No categories
      </div>
    );

  return (
    <div className="p-3 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className={`px-3 py-1 ${
              isSelectedCategory(c.name)
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700"
            } dark:bg-gray-800 text-sm rounded-full dark:text-gray-200 hover:bg-green-500 hover:text-white`}
          >
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
