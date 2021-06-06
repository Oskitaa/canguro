import OfertasComponents from "/components/oferta.jsx/ofertasComponent";
import {useRouter}  from "next/router";
import  useUser  from "/hooks/useUser";
import { useEffect } from "react";

export default function ofertas (){
  const user = useUser()
  const router = useRouter()
 
  useEffect(() => {
    user === null && router.replace("/");
  }, [user]);
  return <OfertasComponents/>
}