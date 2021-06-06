//import {useRouter}  from "next/router";
import  useUser  from "/hooks/useUser";
import {obtenerPersona } from "/firebase/client"
import SingupComponent from "/components/singupComponent";
import { useEffect ,useState } from "react";

export default function Editar() {
  const user = useUser()
  const [info, setInfo] = useState(null)
  //const router = useRouter()  
 
  useEffect( async () => {
    user && setInfo(await obtenerPersona(user.uid))
  }, [user]);

  return <>
  {info && <SingupComponent user={info?.data()}/> }
  </>
}
