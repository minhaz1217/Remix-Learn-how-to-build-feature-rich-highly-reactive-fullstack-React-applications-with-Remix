import { json, useLoaderData, useRouteError } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { getExpense, getExpenses } from "~/data/expenses.server";
import Error from "~/components/util/Error";

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
const ExpensesAnalysisPage = () => {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
};

export async function loader() {
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json(
      {
        message: "No expenses found",
      },
      {
        status: 404,
      }
    );
  }
  return expenses;
}

export default ExpensesAnalysisPage;

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main>
      <Error title={error?.statusText}>
        <p>{error.data?.message || "Something went wrong"}</p>
      </Error>
    </main>
  );
}
