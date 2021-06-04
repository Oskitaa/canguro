import { log } from '/firebase/client'
import Link from 'next/link'
import { useRouter } from "next/router"
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Login() {
    const router = useRouter()
    const [validated, setValidated] = useState(false);
    const onSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        const { email, password } = event.target
        form.checkValidity() && log(email.value, password.value)
        setValidated(true)
        router.push("/")
    }

    return (
        <div className="container">
            <h1>Inicio de sesión</h1>
            <div className="dialog">
                <Form noValidate onSubmit={onSubmit} validated={validated}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control required type="email" placeholder="Email" name="email" min="3"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" name="password" required min="6" max="8"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Text><Link href="/forgotpassword">Has olvidado tu contraseña?</Link></Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="myBtn">
                        Iniciar sesión
                    </Button>
                </Form>
            </div>
            <style type="text/css">{`
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