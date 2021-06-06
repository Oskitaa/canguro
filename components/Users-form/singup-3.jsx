import { Form, Row, Image, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function Form3(props) {
  const [provincia, setProvincia] = useState([]);

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
        <Form.Control
          as="textarea"
          rows={5}
          name="descripcion"
          defaultValue={props?.info?.descripcion}
          required
        />
      </Form.Group>
      <Form.Group controlId="domicilio">
        <Form.Label>Domicilio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Domicilio"
          name="domicilio"
          defaultValue={props?.info?.domicilio}
          required
        />
      </Form.Group>
      <Form.Group controlId="prinvincia">
        <Form.Label>Provincia</Form.Label>
        <Form.Control as="select" placeholder="Provincia" name="provincia">
          {provincia.map((e) => {
            return (
              <option
                value={e.path}
                key={e.path}
                selected={e.path == props?.info?.provincia}
                required
              >
                {e.path}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.File
          type="file"
          name="foto"
          key="foto"
          id="foto"
          label="Foto de perfil"
          custom
          required={!props?.info}
        />
      </Form.Group>
      <Form.Group controlId="terminos" hidden={props?.info}>
        <Form.Check
          type="checkbox"
          label="Acepto los terminos y condiciones"
          name="terminos"
          id="terminos"
          key="terminos"
          required={!props?.info}
        />
      </Form.Group>
      <Form.Group hidden={!props?.info}>
        <Row>
          <Col>
            <Image src={props?.info?.photoURL}></Image>
          </Col>
          <Col>
            <Form.Text as={Col}>Imagen actual (No se reflejará la nueva imagen si la subes)</Form.Text>
          </Col>
        </Row>
      </Form.Group>

      <style type="text/css">{`
        textarea {
          resize: none;
        }

        .row img{
          width: 96px;
          height:96px;
        }
        
        .row .col{
          margin:auto;
        }

        .row{
          text-align:center;
        }

    `}</style>
    </>
  );
}
