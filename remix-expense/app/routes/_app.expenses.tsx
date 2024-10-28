import { json, Link, Links, Outlet, useLoaderData } from "@remix-run/react";
import expenseStyle from "~/styles/expenses.css?url";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

const ExpensePage = () => {
  const expenses = useLoaderData<[]>();
  const hasExpenses = expenses && expenses.length > 0;
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
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default ExpensePage;
export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);
  const expenses = await getExpenses();
  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "No expense found" },
  //     {
  //       status: 404,
  //     }
  //   );
  // }
  return expenses;
}

// export function ErrorBoundary() {
//   return <p>Error</p>;
// }
