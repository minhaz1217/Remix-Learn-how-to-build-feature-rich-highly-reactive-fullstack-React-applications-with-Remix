import { Link, Outlet } from "@remix-run/react";
import expenseStyle from "~/styles/expenses.css?url";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaDownload, FaPlus } from "react-icons/fa";
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
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            Load Raw Data
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSE} />
      </main>
    </div>
  );
};

export default ExpensePage;
