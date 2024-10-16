import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";
function ExpenseListItem({ id, title, amount }) {
  const submit = useSubmit();
  const fetcher = useFetcher();

  console.debug("Expense Id", id);
  function deleteExpenseItemHandler() {
    const proceed = confirm("Are you sure? Do you want to delete this item?");
    // submit(null , {
    //    method: "DELETE",
    //    action : `/expense/${id}`
    // });

    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: "DELETE",
      action: `/expense/${id}`,
    });

    console.debug("fetcher.data", fetcher.data);
  }
  if (fetcher.state !== "idle") {
    return <article className="expense-item locked">Deleting...</article>;
  }
  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button type="submit">Delete</button>
        </Form> */}
        <Link to={`${id}`}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
