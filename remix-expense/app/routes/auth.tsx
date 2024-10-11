import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
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
