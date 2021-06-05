import { useLayoutEffect } from "react";
import useUser from "/hooks/useUser";
import { useRouter } from "next/router";
import MostrarPerfil from "/components/mostrarPerfil";

export default function Perfil() {
  const user = useUser();
  const router = useRouter();

  useLayoutEffect(() => {
      user === null && router.replace("/")
  }, []);

  return <MostrarPerfil uid={user?.uid} />;
}
