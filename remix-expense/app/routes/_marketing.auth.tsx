import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import { ActionFunctionArgs } from "@remix-run/node";
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

  // validate user action

  if (authMode === "login") {
    // login
  } else {
    // sign up
  }
}
