import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SectionCardProps {
  title?: string;
  description?: string;
  icon?: IconDefinition;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  description,
  icon,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-6">
      {title && (
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className="shrink-0 w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded flex items-center justify-center">
                <FontAwesomeIcon
                  icon={icon}
                  className="text-blue-600 dark:text-blue-400 text-sm"
                />
              </div>
            )}
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
              {title}
            </h2>
          </div>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="text-gray-900 dark:text-gray-50">{children}</div>
    </div>
  );
}
