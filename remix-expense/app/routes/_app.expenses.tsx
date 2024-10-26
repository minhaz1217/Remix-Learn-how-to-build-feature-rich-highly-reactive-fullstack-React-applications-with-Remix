import { Link, Outlet, useLoaderData } from "@remix-run/react";
import expenseStyle from "~/styles/expenses.css?url";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";

const ExpensePage = () => {
  const expenses = useLoaderData();
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
        <ExpensesList expenses={expenses} />
      </main>
    </div>
  );
};

export default ExpensePage;
export async function loader() {
  const expenses = await getExpenses();
  return expenses;
}
