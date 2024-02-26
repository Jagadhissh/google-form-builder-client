import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// type ErrorData = {
//   message?: string;
//   success?: boolean;
// };

// type ErrorResponse = {
//   status?: number;
//   data: ErrorData;
// };

type ErrorResponse = {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR";
  data?: unknown;
  error?: string;
  originalStatus?: number;
};
const ErrorMessage = ({ status, data }: ErrorResponse) => {
  return (
    <Alert variant="destructive" className=" bg-white mb-3">
      <ExclamationTriangleIcon className="h-4 w-4 text-destructive" />
      <AlertTitle>Error {status}</AlertTitle>
      <AlertDescription>{data?.message || "Unknown error"}</AlertDescription>
    </Alert>
  );
};
export default ErrorMessage;
