import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

import marketingStyles from "~/styles/marketing.css?url";
export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: marketingStyles,
    },
  ];
}
export async function loader({ request }: LoaderFunctionArgs) {
  console.debug("Hit the loader");
  const userId = await getUserFromSession(request);
  console.debug("Loader", userId);
  return userId;
}
