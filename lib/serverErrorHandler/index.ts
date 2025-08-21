import { notFound } from "next/navigation";

export async function handleServerError<T>(
  asyncFn: () => Promise<T>,
  options: {
    fallbackToNotFound?: boolean;
    logError?: boolean;
  } = {}
): Promise<T> {
  const { fallbackToNotFound = true, logError = true } = options;

  try {
    return await asyncFn();
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_NOT_FOUND") {
      throw error;
    }

    if (logError) {
      console.error("Server operation failed:", error);

      // Log specific error types for API errors
      if (error instanceof Error) {
        if (
          error.message.includes("400") ||
          error.message.includes("504") ||
          error.message.includes("Failed to fetch")
        ) {
          console.error("API Gateway timeout or network error:", error.message);
        }
      }
    }

    if (fallbackToNotFound) {
      notFound();
    }

    throw error;
  }
}
