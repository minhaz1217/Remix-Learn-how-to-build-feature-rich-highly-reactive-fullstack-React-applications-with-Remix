import { Expense } from "@prisma/client";
import { prisma } from "./database.server";

export async function addExpense(expenseData: Partial<Expense>) {
  try {
    return prisma.expense.create({
      data: {
        title: expenseData.title || "",
        amount: Number(+(expenseData.amount || 0)),
        date: new Date(expenseData.date ?? new Date()).toISOString(),
      },
    });
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
