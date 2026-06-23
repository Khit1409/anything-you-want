import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function FormLayout({
  title,
  subtitle,
  children,
}: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded">
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-blue-600 dark:text-blue-400 text-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </div>

        {/* Form Container */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
