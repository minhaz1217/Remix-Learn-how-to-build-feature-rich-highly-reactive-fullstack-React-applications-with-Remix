import {
  Link,
  useActionData,
  useNavigation,
  useLoaderData,
  useMatches,
  useParams,
} from "@remix-run/react";
import { Form } from "@remix-run/react";
function ExpenseForm() {
  const validationErrors = useActionData();
  const navigation = useNavigation();
  const matches = useMatches();
  const params = useParams();

  console.debug("Matches", matches);

  const expenses = matches.find((x) => x.id === "routes/_app.expenses").data;
  console.debug("Data", expenses, params.id);
  const expenseData = expenses.find(
    (expense) => expense.id.toString() === params.id.toString()
  );
  console.debug("Ex", expenseData);

  // const expenseData = useLoaderData();
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const isSubmitting = navigation.state !== "idle";

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValues.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ""
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
