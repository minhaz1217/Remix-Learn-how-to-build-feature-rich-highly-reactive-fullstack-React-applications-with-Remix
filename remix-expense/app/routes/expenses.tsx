import { Outlet } from "@remix-run/react";
import expenseStyle from "~/styles/expenses.css?url";
import ExpensesList from "~/components/expenses/ExpensesList";
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
const ExpensePage = () => {
  return (
    <div>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSE} />
      </main>
    </div>
  );
};

export default ExpensePage;

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: expenseStyle,
    },
  ];
};
