import { auth } from '/firebase/client'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
export default function Forgotpassword(){
    const [send,setSend] = useState(false)
    const onSubmit = (e) =>{
        e.preventDefault()
        auth.sendPasswordResetEmail(e.target.email.value)
        setSend(true)
    }
    return(
        <div className="container">
        <h1>Restablecer contraseña</h1>
        <div className="dialog">
            <Form onSubmit={onSubmit} hidden={send}>
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
            <p>Revise su correo electrónico para ver si hay un enlace para restablecer su contraseña. Si no aparece en unos minutos, revise su carpeta de correo no deseado.</p>
            <Button><Link href="/">Volver</Link></Button>
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
                height:100vh;
            }
        `}</style>
    </div>

    )
}