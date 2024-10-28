import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});
async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  console.debug("Setting UserId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}
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

  const user = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });

  return createUserSession(user.id.toString(), "/expenses");
}

export async function login({ email, password }: any) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (!existingUser) {
    const error = new Error("User doesn't exist");
    error.status = 401;
    throw error;
  }
  //   const passwordHash = await hash(password, 12);

  if (existingUser.password !== password) {
    const error = new Error("Wrong credentials");
    error.status = 403;
    throw error;
  }
  return createUserSession(existingUser.id.toString(), "/expenses");
}

export async function getUserFromSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }
  return userId;
}

export async function destroyUserSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  await sessionStorage.destroySession(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request: any) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }
}
