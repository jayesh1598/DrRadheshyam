import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { AlertCircle, Home } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred';
  let errorStatus = 500;
  let errorDetails = '';

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || 'Error';
    if (error.data?.message) {
      errorDetails = error.data.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || '';
  } else if (typeof error === 'object' && error !== null) {
    errorDetails = JSON.stringify(error, null, 2);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 sm:p-12">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Status */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{errorStatus}</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{errorMessage}</h2>
          {errorDetails && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded p-3 mt-4 text-left font-mono overflow-auto max-h-32">
              {errorDetails}
            </p>
          )}
        </div>

        {/* Error Description */}
        <p className="text-gray-600 text-center mb-8">
          We encountered an issue while processing your request. Please try again or return to the home page.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
