import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { validateCredentials } from "~/data/validation.server";
import { getUserFromSession, login, signup } from "~/data/auth.server";
const AuthPage = () => {
  return <AuthForm />;
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: authStyle,
    },
  ];
};

export default AuthPage;

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user action
  try {
    validateCredentials(credentials);
  } catch (error: any) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error: any) {
    console.debug("Got some error", error);
    if (error.status === 422) {
      return {
        credentials: error.message,
      };
    }
  }
  return null;
}
