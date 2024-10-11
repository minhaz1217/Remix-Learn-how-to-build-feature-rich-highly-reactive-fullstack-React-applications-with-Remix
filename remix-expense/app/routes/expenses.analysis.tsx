import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

export const DUMMY_EXPENSE = [
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
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSE} />
      <ExpenseStatistics expenses={DUMMY_EXPENSE} />
    </main>
  );
};

export default ExpensesAnalysisPage;
