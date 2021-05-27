import Link from 'next/link'
import Form2 from '/components/Users-form/singup-2'
import Form1 from '/components/Users-form/singup-1'
import Form3 from '/components/Users-form/singup-3'
import { useRouter } from "next/router"
import { Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function Singup() {

    const router = useRouter()
    const [validated, setValidated] = useState(false);
    const [tipoUser, setTipoUser] = useState(undefined)
    const [parte, setParte] = useState(1)
   
    const onSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        const { target} = event
        
        console.log(Array.from(event.target.horario).filter( e => e.checked))
        console.log(Array.from(event.target.experiencia).filter( e => e.checked))
    }
    

    const seltipoUser = (e) => setTipoUser(e.target.value)
    return (
        <div className="container">
            <h1>Registarse</h1>
            <div className="dialog">

                <Form noValidate onSubmit={onSubmit} >
                    <div className="parte1" hidden={parte != 1}>
                        <Form1 />
                    </div>
                    <div className="parte2" hidden={parte != 2}>
                        <Form2 seltipoUser={seltipoUser} tipoUser={tipoUser} />
                    </div>
                    <div className="parte3" hidden={parte != 3}>
                        <Form3  />
                    </div>

                    <Form.Group>
                        <Form.Text><Link href="/login">¿Tienes cuenta? Inicia sesión</Link></Form.Text>
                    </Form.Group>
                    <Form.Row>

                        <Button variant="primary" type="button" className="myBtn izq" as={Col} hidden={parte == 1} onClick={() => parte > 1 ? setParte(parte - 1) : "disabled"}>
                            Atras
                        </Button>
                        <Button variant="primary" type="button" className={'myBtn',(parte===1) && 'de '} as={Col} hidden={parte == 3} onClick={() => parte < 4 ? setParte(parte + 1) : parte}>
                            Siguiente
                        </Button>
                        <Button type="submit" variant="primary" className="myBtn" hidden={parte != 3}>
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
                    height: 500px;
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
                    min-width:450px;
                    height: 540px;
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