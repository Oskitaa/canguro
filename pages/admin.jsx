import { useEffect } from "react";
import useUser from "/hooks/useUser";
import { useRouter } from "next/router";
import AdminComponent from "/components/adminComponent"
export default function Admin() {
  const user = useUser();
    const router = useRouter()

  useEffect(() => {
    user && user?.email !== "admin@cangurapp.com" && router.replace("/");
  }, [user])

  return <AdminComponent />
}
