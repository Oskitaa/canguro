import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginComponent from "/components/loginComponent";
import useUser from "/hooks/useUser";

export default function Login() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    user && router.replace("/");
  }, [user]);

  return <LoginComponent />;
}