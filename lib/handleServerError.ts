import axios from 'axios';

export function handleServerError(
  error: unknown,
  fallbackMessage = 'Something went wrong',
) {
  // ✅ Handle Axios errors
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.details ||
      error.response?.data?.error ||
      error.message ||
      fallbackMessage;
    return new Error(message);
  }

  // ✅ Handle other JS errors
  if (error instanceof Error) {
    return new Error(error.message || fallbackMessage);
  }

  // ✅ Handle anything else (string, object, null)
  return new Error(fallbackMessage);
}
