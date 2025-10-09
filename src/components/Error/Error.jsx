import { useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">Oops!</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-2">
        Something went wrong.
      </h2>
      <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
        We couldn't load the page you requested.
      </p>
      {error && (
        <div className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded-md dark:bg-red-800 dark:text-red-200">
          <p>
            <strong>Error Code:</strong> {error.status || "Unknown"} <br />
            <strong>Message:</strong> {error.statusText || "Unexpected error"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Error;
