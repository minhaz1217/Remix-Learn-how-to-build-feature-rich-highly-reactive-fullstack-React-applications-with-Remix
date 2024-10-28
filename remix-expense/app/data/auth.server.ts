import { prisma } from "./database.server";
export async function signup({ email, password }: any) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    const error = new Error("User with email exists");
    error.status = 422;
    throw error;
  }
  //   const passwordHash = await hash(password, 12);

  prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
}
