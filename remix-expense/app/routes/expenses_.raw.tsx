import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

const DUMMY_EXPENSE = [
  {
    id: "e1",
    title: "First Expense",
    amount: 10,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second Expense",
    amount: 15,
    date: new Date().toISOString(),
  },
];
export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);
  return DUMMY_EXPENSE;
}
