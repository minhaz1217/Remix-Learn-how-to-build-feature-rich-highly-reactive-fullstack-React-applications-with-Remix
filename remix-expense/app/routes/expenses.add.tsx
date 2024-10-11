import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
const ExpensesAddPage = () => {
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  await addExpense(expenseData);
  return redirect("/expenses");
}

export default ExpensesAddPage;
