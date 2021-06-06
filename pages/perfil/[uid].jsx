import { useRouter } from "next/router";
import MostrarPerfil from "/components/mostrarPerfil";

export default function Perfil() {
  const router = useRouter();
  const { uid } = router.query;

  return <MostrarPerfil uid={uid}/>;
}
