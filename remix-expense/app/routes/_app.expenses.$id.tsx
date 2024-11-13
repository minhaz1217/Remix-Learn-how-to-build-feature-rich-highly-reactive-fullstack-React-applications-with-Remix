import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

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

export async function action({ request, params }: ActionFunctionArgs) {
  const expenseId = params.id;
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
    try {
      validateExpenseInput(expenseData);

      await updateExpense(expenseId?.toString() ?? "", expenseData as any);
      return redirect("/expenses");
    } catch (error: any) {
      return error;
    }
  } else if (request.method === "DELETE") {
    try {
      await deleteExpense(expenseId?.toString() ?? "");
      return { expenseId: expenseId };
    } catch (error: any) {
      return error;
    }
    return redirect("/expenses");
  }
}
