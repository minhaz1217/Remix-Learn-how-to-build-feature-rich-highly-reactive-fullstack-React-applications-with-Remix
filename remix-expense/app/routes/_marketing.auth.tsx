import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { validateCredentials } from "~/data/validation.server";
import { signup } from "~/data/auth.server";
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
      // login
    } else {
      // sign up
      await signup(credentials);
      return redirect("/expenses");
    }
  } catch (error: any) {
    if (error.status === 422) {
      return {
        credentials: error.message,
      };
    }
  }
}
