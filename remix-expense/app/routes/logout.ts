import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Error("Invalid request");
  }
  console.debug("Request", request);
  
  return destroyUserSession(request);
}
