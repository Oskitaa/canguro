import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function Form3() {
  const [provincia, setProvincia] = useState([]);
  const exp = ["Bebes", "Niños", "Adolescentes"];
  const url =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=provincias-espanolas&q=&sort=provincia&facet=provincia";
  const getPro = () => {
    fetch(url)
      .then((e) => e.json())
      .then((e) => {
        const { facet_groups } = e;
        const { facets } = facet_groups[0];
        setProvincia((pre) => pre.concat(facets));
      });
  };

  useEffect(() => {
    getPro();
  }, []);

  return (
    <>
      <Form.Group controlId="description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={5} name="description" />
      </Form.Group>
      <Form.Group controlId="domicilio">
        <Form.Label>Domicilio</Form.Label>
        <Form.Control type="text" placeholder="Domicilio" name="domicilio" />
      </Form.Group>
      <Form.Group controlId="prinvincia">
        <Form.Label>Provincia</Form.Label>
        <Form.Control as="select" placeholder="Provincia" name="provincia">
          {provincia.map((e) => {
            return (
              <option value={e.path} key={e.path}>
                {e.path}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="experiencia">
        <Form.Label>Experiencia</Form.Label>
        <Form.Row>
          {exp.map( e => {
              return <Form.Check type="checkbox" value={e} key={e} name="experiencia" id={e} label={e}/>
          })}
        </Form.Row>
      </Form.Group>
      <style type="text/css">{`
                        textarea {
                            resize: none;
                        }
                `}</style>
    </>
  );
}
