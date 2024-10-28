import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import tailwindCss from "./tailwind.css?url";
import sharedCss from "~/styles/shared.css?url";
import MainHeader from "~/components/navigation/MainHeader";
import Error from "~/components/util/Error";
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: tailwindCss,
  },
  {
    rel: "stylesheet",
    href: sharedCss,
  },
];

export const meta: MetaFunction = () => {
  return [
    {
      title: "RemixExpense",
    },
  ];
};

function Document({ title, children }: any) {
  const matches = useMatches();
  const disableJs = matches.some((match) => match.handle?.disableJs);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJs && <Scripts />}
      </body>
    </html>
  );
}

// export function Layout({ children }: { children: React.ReactNode }) {
//   return <App></App>;
// }

export default function App() {
  return (
    <>
      <Document>
        <Outlet />
      </Document>
    </>
  );
}

export function ErrorBoundary() {
  const caughtResponse: any = useRouteError();
  console.debug("Caught error", caughtResponse);

  return (
    <Document>
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
    </Document>
  );
}
