import { Outlet } from "@remix-run/react";
import ExpenseHeader from "~/components/expenses/ExpenseHeader";

import expenseStyle from "~/styles/expenses.css?url";
export default function ExpenseAppLayout() {
  return (
    <>
      <ExpenseHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: expenseStyle,
    },
  ];
}
