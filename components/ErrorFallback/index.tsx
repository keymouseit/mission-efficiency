"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface ErrorFallbackProps {
  error?: Error;
  retry?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, retry }) => {
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRetrying(false);
    retry?.();
  };

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 text-center mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {isDevelopment && error && (
          <details className="mb-4 p-3 bg-gray-50 rounded border">
            <summary className="cursor-pointer font-medium text-sm text-gray-700">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-red-600 whitespace-pre-wrap overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\nStack Trace:\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex justify-center items-center flex-col sm:flex-row gap-3">
          {retry && (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRetrying ? "Retrying..." : "Try Again"}
            </button>
          )}

          <Link href="/">
            <Button className="modals-gradientBtn px-10">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
