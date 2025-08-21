"use client";

import React from "react";
import ErrorFallback from "../ErrorFallback";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
}

// Error logging function (can be used in client component)
const logError = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error("Global Error Boundary:", error, errorInfo);

  // Send to your error tracking service
  // Example integrations:
  // if (typeof window !== 'undefined') {
  //   Sentry.captureException(error, { extra: errorInfo });
  //   LogRocket.captureException(error);
  // }
};

class ClientErrorBoundary extends React.Component<
  ClientErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeoutId: number | null = null;

  constructor(props: ClientErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log the error
    logError(error, errorInfo);
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} retry={this.handleRetry} />
      );
    }

    return this.props.children;
  }
}

export default ClientErrorBoundary;
