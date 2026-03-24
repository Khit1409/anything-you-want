import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTag } from "@fortawesome/free-solid-svg-icons";
import { ProductClassification } from "@/interfaces/response/product.response";

interface Props {
  classification: Array<ProductClassification>;
}

export default function ProductClassificationPreview(props: Props) {
  const { classification } = props;

  return (
    <div className="flex flex-col divide-y divide-zinc-100 p-4">
      {classification.map((classifi) => (
        <div key={classifi.name} className="py-5 first:pt-0 last:pb-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon
              icon={faTag}
              className="text-zinc-400 text-[15px]"
            />
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-400">
              Phân loại
            </span>
            <span className="h-px flex-1 bg-zinc-100" />
            <span className="font-semibold text-zinc-800 tracking-wide uppercase">
              {classifi.name}
            </span>
          </div>

          {/* Values */}
          <div className="flex flex-wrap gap-2">
            {classifi.values.map((value) =>
              value.img ? (
                /* Image variant */
                <div
                  key={value.name}
                  className="group flex flex-col items-center gap-1.5 cursor-pointer"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border border-zinc-200 bg-zinc-50 hover:border-zinc-800 transition-colors duration-200">
                    <Image
                      src={value.img}
                      fill
                      className="object-cover"
                      alt={value.name}
                      title={value.name}
                    />
                    <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-all duration-200 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500 group-hover:text-zinc-900 tracking-wide transition-colors duration-200">
                    {value.name}
                  </span>
                </div>
              ) : (
                /* Text variant */
                <div
                  key={value.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-200 bg-white hover:border-zinc-800 hover:bg-zinc-900 cursor-pointer transition-all duration-200 group"
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[10px] text-zinc-300 group-hover:text-zinc-500 transition-colors duration-200"
                  />
                  <span className="text-[13px] font-medium text-zinc-700 group-hover:text-white tracking-wide transition-colors duration-200 whitespace-nowrap">
                    {value.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
