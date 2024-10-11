import { Outlet } from "@remix-run/react";

import expenseStyle from "~/styles/expenses.css?url";
export default function ExpenseAppLayout() {
  return <Outlet />;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: expenseStyle,
    },
  ];
}
