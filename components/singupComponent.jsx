import Link from "next/link";
import Form2 from "/components/Users-form/singup-2";
import Form1 from "/components/Users-form/singup-1";
import Form3 from "/components/Users-form/singup-3";
import { useRouter } from "next/router";
import { Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { singUp , updatePerfil} from "/firebase/client";

export default function SingupComponent(props) {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [tipoUser, setTipoUser] = useState(undefined);
  const [parte, setParte] = useState(1);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const { target } = event;
        const {
          foto,
          nombre,
          apellido,
          password,
          passwordConfirm,
          fecha,
          horario,
          precio,
          descripcion,
          domicilio,
          provincia,
          experiencia,
          terminos,
        } = target;
        if (password.value!= passwordConfirm.value) {
          return;
        }
        const horario2 = Array.from(horario)
          .filter((e) => e.checked)
          .map((e) => {
            return e.value;
          });
        const experiencia2 = Array.from(experiencia)
          .filter((e) => e.checked)
          .map((e) => {
            return e.value;
          });
          if(horario2.length == 0) return;
          !props?.user ?
        singUp({
          displayName: nombre.value,
          surname: apellido.value,
          email: email.value,
          password: password.value,
          fecha_nacimiento: fecha.value,
          tipo: tipoUser,
          horario: horario2,
          precio: precio.value,
          experiencia: experiencia2,
          descripcion: descripcion.value,
          domicilio: domicilio.value.replace("/", " ").replace(" , ", " "),
          provincia: provincia.value,
          file: foto.files[0],
          terminos: terminos.value,
        }) 
        :
        updatePerfil({
            displayName: nombre.value,
            surname: apellido.value,
            email: email.value,
            password: password.value,
            fecha_nacimiento: fecha.value,
            tipo: tipoUser ? tipoUser : props?.user.tipo,
            horario: horario2,
            precio: precio.value,
            experiencia: experiencia2,
            descripcion: descripcion.value,
            domicilio: domicilio.value.replace("/", " ").replace(",", " "),
            provincia: provincia.value,
            file: foto.files[0] || null,
            terminos: terminos.value,
          }) 
        router.push("/perfil");
      }
    
  };

  const seltipoUser = (e) => setTipoUser(e.target.value);
  return (
    <div className="container">
      <h1>{props?.user ? "Editar" : "Registarse"}</h1>
      <div className="dialog">
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <div className="parte1" hidden={parte != 1}>
            <Form1 info={props?.user}/>
          </div>
          <div className="parte2" hidden={parte != 2}>
            <Form2 seltipoUser={seltipoUser} tipoUser={tipoUser} info={props?.user}/>
          </div>
          <div className="parte3" hidden={parte != 3}>
            <Form3 info={props?.user}/>
          </div>

          <Form.Group>
            <Form.Text>
              <Link href="/login">¿Tienes cuenta? Inicia sesión</Link>
            </Form.Text>
          </Form.Group>
          <Form.Row>
            <Button
              variant="primary"
              type="button"
              className="myBtn izq"
              as={Col}
              hidden={parte == 1}
              onClick={() => (parte > 1 ? setParte(parte - 1) : "disabled")}
            >
              Atras
            </Button>
            <Button
              variant="primary"
              type="button"
              className={("myBtn", parte === 1 && "de ")}
              as={Col}
              hidden={parte == 3}
              onClick={() => (parte < 4 ? setParte(parte + 1) : parte)}
            >
              Siguiente
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="myBtn"
              hidden={parte != 3}
            >
              Registro
            </Button>
          </Form.Row>
        </Form>

      </div>
      <style type="text/css">{`
                h1{
                    margin-bottom: 15px;
                }

                form{
                    height: 550px;
                    position:relative;
                }
                .izq{
                    left:0;
                }

                .de{
                    width:100% !important;
                }

                .btn-primary{
                    right:0;
                    position: absolute;
                    bottom:0;
                    width:50%;
                }
                .dialog{
                    min-width:400px;
                    height: 600px;
                    padding:20px;
                    border-radius:10px;
                    box-shadow:0px 0px 5px #333;
                }
                .container{
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    height:88vh;
                }
            `}</style>
    </div>
  );
}
