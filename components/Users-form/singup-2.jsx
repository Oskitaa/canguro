import { Form, Col } from "react-bootstrap";
import {days, horario, exp} from "/constant/forms"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form2(props) {
  
  return (
    <>
      {" "}
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Tipo :</Form.Label>
        </Form.Group>
        <Form.Group as={Col} onChange={props.seltipoUser}>
          <Form.Check
            type="radio"
            label="Canguro"
            name="tipoUser"
            value="canguro"
            id="canguro"
            defaultChecked={props?.info?.tipo == "canguro"}
            required
          />
          <Form.Check
            type="radio"
            label="Progenitor"
            value="progenitor"
            name="tipoUser"
            id="progenitor"
            defaultChecked={props?.info?.tipo == "progenitor"}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="horas">
        <Form.Label>
          {props.tipoUser === "canguro" ? "Disponibilidad" : "Días necesarios"}
        </Form.Label>

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
                        <Form.Check
                          type="checkbox"
                          value={day + hour}
                          name="horario"
                          id={day + hour}
                          key={day + hour}
                          defaultChecked={props?.info?.horario?.includes(day+hour)}

                          
                        />
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form.Group>
      <Form.Group controlId="precio">
        <Form.Label>Precio por hora</Form.Label>
        <Form.Control type="text" placeholder="Precio" name="precio" defaultValue={props?.info?.precio} required />
      </Form.Group>
      <Form.Group controlId="experiencia">
        <Form.Label>
          {" "}
          {props.tipoUser === "canguro" ? "Experiencia :" : "Tengo : "}
        </Form.Label>
        <Form.Row>
          {exp.map((e) => {
            return (
              <Col>
              <Form.Check
                type="checkbox"
                value={e}
                key={e}
                name="experiencia"
                id={e}
                label={e}
                defaultChecked={props?.info?.experiencia?.includes(e)}
              />
              </Col>
            );
          })}
        </Form.Row>
      </Form.Group>
      <style jsx>{`
        table {
          text-align: center;
          margin: auto;
        }
      `}</style>
    </>
  );
}
