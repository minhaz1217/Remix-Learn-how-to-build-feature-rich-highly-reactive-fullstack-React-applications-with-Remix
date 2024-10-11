import { Outlet } from "@remix-run/react";

const ExpensePage = () => {
  return (
    <div>
      <h1>Expense</h1>
      <Outlet />
    </div>
  );
};

export default ExpensePage;
