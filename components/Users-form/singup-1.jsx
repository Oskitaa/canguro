import { Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Form1() {
    return (
        <>
            <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre" name="nombre" />
            </Form.Group>
            <Form.Group controlId="spellido">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellido" name="apellido" />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control type="email" placeholder="Email" name="email" />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" name="password" />
                </Form.Group>
                <Form.Group as={Col} controlId="passwordConfirm">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" name="passwordConfirm" />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="fecha">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" name="fecha" />
            </Form.Group>
        </ >
    )
}