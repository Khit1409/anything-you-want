import React from "react";

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
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
