"use client";
import { Component, ReactNode, ErrorInfo } from "react";
import * as Sentry from "@sentry/nextjs";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-fallback flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Something went wrong</h2>
              <p className="mb-6 text-gray-600">Please refresh the page or contact us if the problem persists.</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
