import { Expense } from "@prisma/client";
import { prisma } from "./database.server";

export async function addExpense(
  expenseData: Partial<Expense>,
  userId: number
) {
  try {
    return prisma.expense.create({
      data: {
        title: expenseData.title || "",
        amount: Number(+(expenseData.amount || 0)),
        date: new Date(expenseData.date ?? new Date()).toISOString(),
        User: {
          connect: { id: userId },
        },
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to add expense");
  }
}

export async function getExpenses(userId: number) {
  try {
    const expenses = prisma.expense.findMany({
      where: { userId: userId },
      orderBy: {
        date: "desc",
      },
    });
    return expenses;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to get expense");
  }
}

export async function getExpense(id: string, userId: number) {
  try {
    const expenses = prisma.expense.findFirst({
      where: { id: Number(id), userId: userId },
    });
    return expenses;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to get expense");
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
    throw new Error("Failed to update expense");
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
    throw new Error("Failed to delete expense");
  }
}
