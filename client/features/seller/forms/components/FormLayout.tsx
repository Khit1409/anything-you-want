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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Container */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
