import { log } from '/firebase/client'
import Link from 'next/link'
import Form2 from '/components/Users-form/singup-2'
import {useRouter} from "next/router"
import { Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function Singup() {
    const router = useRouter()
    const [validated, setValidated] = useState(false);
    const [tipoUser,setTipoUser] = useState()

    const [parte, setParte] = useState(1)

    const onSubmit = (event) => {
        console.log("idjfnsaodjnv")
        event.preventDefault()
        const form = event.currentTarget;
        const { email, password, formHorizontalRadios } = event.target
        //console.log("event.target", formHorizontalRadios.value)
       console.log(event)
    }

    const seltipoUser = (e) => setTipoUser(e.target.value)
    return (
        <div className="container">
            <h1>Registarse</h1>
            <div className="dialog">
                <Form onSubmit={onSubmit} >
                    <div>                    <Button type="submit">EEE</Button>
                    <Button type="submit">EEE</Button>
</div>
                </Form>
                <Form onSubmit={onSubmit} >
                    <div className="parte1" hidden={parte != 1}>
                    <Form.Group controlId="formBasicEmaild">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control required type="email" placeholder="Email" name="email" min="3" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" name="password" required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicPasswordd">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" name="passwordConfirm" required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control type="date" name="fecha_nac" required />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Tipo :</Form.Label>
                        </Form.Group >
                        <Form.Group as={Col} onChange={seltipoUser}>
                            <Form.Check
                                type="radio"
                                label="Canguro"
                                name="formHorizontalRadios"
                                value="canguro"
                                id="canguro"
                            />
                            <Form.Check
                                type="radio"
                                label="Progenitor"
                                value="progenitor"
                                name="formHorizontalRadios"
                                id="progenitor"
                            />
                        </Form.Group>
                    </Form.Row>
                    </div>
                    <div className="parte2" hidden={parte!=2}>
                    <Form.Group controlId="formBffasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control required type="text" placeholder="Email" name="emargrgilr" min="3" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmfffail">
                        <Form.Label>Apleido</Form.Label>
                        <Form.Control required type="text" placeholder="Email" name="emargrgil" min="3" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmaffil">
                        <Form.Label>Experiencia</Form.Label>
                        <Form.Control required type="text" placeholder="Email" name="emgrgail" min="3" />
                    </Form.Group>
                    </div>
                    <div className="parte3" hidden={parte!=3}>
                        <Form2/>
                    </div>
                    <div className="canguro" hidden={tipoUser!="canguro"}>
                        <h4>Se muestra si es canguro</h4>
                    </div>

                    <div className="progenitor" hidden={tipoUser!="progenitor"}>
                        <h4>Se muestra si es progenitor</h4>
                    </div>




                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Text><Link href="/login">¿Tienes cuenta? Inicia sesión</Link></Form.Text>
                    </Form.Group>
                    <Form.Row>
                      
                    <Button variant="primary" type="button" className="myBtn" as={Col} hidden={parte==1} onClick={()=> parte > 1 ? setParte(parte - 1) : "disabled"}>
                        Atras
                    </Button>
                    <Button variant="primary" type="button" className="myBtn" as={Col} hidden={parte==3} onClick={()=> parte < 4 ? setParte(parte + 1) : parte}>
                        Siguiente 
                    </Button>
                    <Button type="submit" variant="primary" className="myBtn"  hidden={parte!=3} as={Col}>
                        Registro 
                    </Button>
                 
                    </Form.Row>
                    
                </Form>
            </div>
            <style type="text/css">{`
                h1{
                    margin-bottom: 15px;
                }
                .dialog{
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