import { useRouteError } from "react-router-dom";

interface IError {
    data: string;
    error: Error;
    internal: boolean;
    status: number;
    statusText: string;
}

function ErrorPage() {
  const e = useRouteError() as IError;

  return (
    <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {e.error ? (
          <i>{e.statusText || e.error.message}</i>
        ) : null}
    </div>
  );
}

export default ErrorPage;