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

export async function getExpenses() {
  try {
    const expenses = prisma.expense.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return expenses;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

export async function getExpense(id: string) {
  try {
    const expenses = prisma.expense.findFirst({
      where: { id: Number(id) },
    });
    return expenses;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

export async function updateExpense(id: string, expenseData: Expense) {
  try {
    const expenses = prisma.expense.update({
      where: { id: Number(id) },
      data: {
        title: expenseData.title || "",
        amount: Number(+(expenseData.amount || 0)),
        date: new Date(expenseData.date ?? new Date()).toISOString(),
      },
    });
    return expenses;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

export async function deleteExpense(id: string) {
  try {
    const expenses = prisma.expense.delete({
      where: { id: Number(id) },
    });
    return expenses;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
