import { forgotPasswordd } from "/firebase/client";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ForgotPasswordComponent() {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [send, setSend] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
    } else {
      setSend(true);
      forgotPasswordd(e.target.email.value);
    }
  };
  return (
    <div className="container">
      <h1>Restablecer contraseña</h1>
      <div className="dialog">
            <Form noValidate validated={validated} onSubmit={onSubmit} hidden={send} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo electronico</Form.Label>
                    <Form.Control required type="email" placeholder="Email" name="email"/>
                    <Form.Text>Escribe tu dirección de e-mail abajo y te enviaremos algunas instrucciones.</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="myBtn">
                    Enviar
                </Button>
            </Form>
            <div className="enviado" hidden={!send}>
            <p>Si su correo coincide le enviaremos un email, revise su bandeja de spam.</p>
            <Button onClick={() => router.push("/")}>Volver</Button>
            </div>
        </div>
      <style type="text/css">{`
            a{
                color:white;
            }
            a:hover{
                color:white;
            }
            h1{
                margin-bottom: 15px;
            }
            .btn-primary{
                width:100%;
            }
            .dialog{
                width:400px;
                padding:20px;
                border-radius:10px;
                box-shadow:0px 0px 5px #333;
            }
            .container{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                height:70vh;
            }
        `}</style>
    </div>
  );
}
