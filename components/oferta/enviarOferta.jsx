import { Modal, Button, Form } from "react-bootstrap";
import useUser from "/hooks/useUser";
import { days, horario } from "/constant/forms";
import { useState } from "react";
import { crearOferta } from "/firebase/client";

export default function Oferta(props) {
  const user = useUser();
  const [validated, setValidated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { descripcion, horario } = e.target;
    const horario2 = Array.from(horario)
      .filter((e) => e.checked)
      .map((e) => {
        return e.value;
      });
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      if (horario2.length != 0) {
        crearOferta(props.userPerfil?.uid, user.uid, {
          descripcion: descripcion.value,
          disponible: horario2,
          precio: props.userPerfil?.precio,
          estado: "enviado",
        });
        props.visible();
        form.reset();
      }
      setValidated(false);
    }
  };
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Oferta a {props.userPerfil?.nombre}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={onSubmit}
          id="CreateForm"
          noValidate
          validated={validated}
        >
          <Form.Group controlId="description">
            <Form.Label>Seleccione la fecha:</Form.Label>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {horario.map((e) => {
                    return <th key={e}>{e}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => {
                  return (
                    <tr>
                      <th>{day}</th>
                      {horario.map((hour) => {
                        return (
                          <th>
                            {props.userPerfil?.horario?.find(
                              (e) => e === day + hour
                            ) && (
                              <Form.Check
                                type="checkbox"
                                value={day + hour}
                                name="horario"
                                id={day + hour}
                                key={day + hour}
                              />
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>
              Envía instrucciones al {props.userPerfil?.tipo}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="descripcion"
              required
              minLength={20}
              placeholder="Escribe que tiene que hacer o como puede contactar contigo."
            />
            <Form.Control.Feedback type="invalid">
              Mínimo 20 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.visible}>
          Cerrar
        </Button>
        <Button variant="primary" form="CreateForm" type="submit">
          Enviar
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
