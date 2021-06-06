import { Form, Col } from 'react-bootstrap';
import {formaterDate} from "/components/utils/utils"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Form1(props) {
    return (
        <>
            <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre" name="nombre" defaultValue={props?.info?.nombre} required/>
            </Form.Group>
            <Form.Group controlId="spellido">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellido" name="apellido" defaultValue={props?.info?.apellido}required/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control type="email" placeholder="Email" name="email" defaultValue={props?.info?.email}required/>
                <Form.Control.Feedback type="invalid">Introduzca un email válido.</Form.Control.Feedback>

            </Form.Group>
            <Form.Row hidden={props?.info}>
                <Form.Group as={Col} controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" name="password" minLength="6" required={!props?.info}/>
                    <Form.Control.Feedback type="invalid">Minimo 6 caracteres.</Form.Control.Feedback>

                </Form.Group>
                <Form.Group as={Col} controlId="passwordConfirm">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" name="passwordConfirm" minLength="6" required={!props?.info}/>
                    <Form.Control.Feedback type="invalid">Minimo 6 caracteres.</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="fecha">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" name="fecha" defaultValue={(props?.info) ? formaterDate(props?.info?.fecha_nacimiento) : ""} required/>
            </Form.Group>
        </ >
    )
}