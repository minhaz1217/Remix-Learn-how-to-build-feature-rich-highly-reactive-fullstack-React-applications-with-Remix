import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpense } from "~/data/expenses.server";

const ExpensesUpdatePage = () => {
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        navigate("..");
      }}
    >
      <ExpenseForm />
    </Modal>
  );
};

export default ExpensesUpdatePage;

// export async function loader({ params }: LoaderFunctionArgs) {
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId as string);
//   return expense;
// }
