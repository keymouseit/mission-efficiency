"use client";

import React from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";

interface WithErrorBoundaryOptions {
  fallback?: React.ComponentType<{ error?: Error; retry?: () => void }>;
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundary fallback={options.fallback || ErrorFallback}>
      <Component {...props} ref={ref} />
    </ErrorBoundary>
  ));

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}

// lib/serverErrorHandler.ts - For server components (no React.ReactNode return type)
import { notFound } from "next/navigation";

export async function handleServerError<T>(
  asyncFn: () => Promise<T>,
  options: {
    fallbackToNotFound?: boolean;
    logError?: boolean;
  } = {}
): Promise<T | never> {
  const { fallbackToNotFound = true, logError = true } = options;

  try {
    return await asyncFn();
  } catch (error) {
    if (logError) {
      console.error("Server operation failed:", error);
    }

    if (fallbackToNotFound) {
      notFound(); // This will trigger Next.js not-found.tsx
    }

    throw error; // Re-throw to be caught by error boundary
  }
}

// Custom hook for client-side error handling
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    console.error("Client error:", error);
    setError(error);
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  // Throw error to be caught by error boundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { handleError, resetError };
}
