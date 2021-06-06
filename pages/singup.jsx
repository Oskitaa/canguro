import {useRouter}  from "next/router";
import  useUser  from "/hooks/useUser";

import SingupComponent from "/components/singupComponent";
import { useEffect } from "react";

export default function Singup() {
  const user = useUser()
  const router = useRouter()
 
  useEffect(() => {
    user && router.replace("/");
  }, [user]);

  return <SingupComponent />
}
