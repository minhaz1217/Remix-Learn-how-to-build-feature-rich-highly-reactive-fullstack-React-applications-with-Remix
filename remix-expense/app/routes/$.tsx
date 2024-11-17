import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useRouteError } from "@remix-run/react";

import Error from "~/components/util/Error";
export function loader({ params }: LoaderFunctionArgs) {
  //   console.log(params);
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  throw json("Not found", {
    status: 404,
  });
}
export function ErrorBoundary() {
  const caughtResponse: any = useRouteError();
  console.debug("Caught error", caughtResponse);

  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse?.data?.message ||
            "Something went wrong, please try again later"}
        </p>
        <p>
          Back to <Link to="/">safety</Link>
        </p>
      </Error>
    </main>
  );
}
