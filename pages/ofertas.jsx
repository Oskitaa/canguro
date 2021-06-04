import {
  obtenerOfertaDemandante,
  obtenerOfertaOfertante,
  obtenerPersona,
  cambiarEstado,
} from "/firebase/client";
import useUser from "/hooks/useUser";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Ofertas() {
  const user = useUser();
  const router = useRouter();

  const [tipoUser, setTipoUser] = useState(undefined);
  const [ofertas, setOfertas] = useState();
  const [pepe, setPepe] = useState([]);
  const [visible, setvisible] = useState(null)
  const arrayPersonas = () => {
    ofertas.docs.forEach((e) => {
      obtenerPersona(e.data().uid_ofertante).then((el) => {
        setPepe((p) => p.concat(el.data()));
      });
    });
  };

  useEffect(async () => {
    user &&
      tipoUser &&
      (tipoUser?.target.value == "enviadas"
        ? setOfertas(await obtenerOfertaDemandante(user?.uid))
        : setOfertas(await obtenerOfertaOfertante(user?.uid)));
  }, [user, tipoUser]);

  useEffect(() => {
    ofertas && arrayPersonas();
  }, [ofertas]);

  useEffect(async () => {
    user && setOfertas(await obtenerOfertaDemandante(user?.uid));
  }, [user]);

  return (
    <>
      <Container>
        <Form.Group as={Col} onChange={setTipoUser}>
          <Row>
            <Form.Check
              type="radio"
              label="Enviadas"
              name="tipoUser"
              value="enviadas"
              id="enviadas"
              defaultChecked
            />
            <Form.Check
              type="radio"
              label="Recibidas"
              value="recibidas"
              name="tipoUser"
              id="recibidas"
            />
          </Row>
        </Form.Group>
      </Container>
      <Container>
        {ofertas &&
          ofertas.docs.map((doc, i) => {
            
            return (
              <Row md="auto">
                <Col>
                  <img src={pepe[i]?.photoURL} alt="" />
                </Col>
                <Col>
                  <p>{pepe[i]?.nombre}</p>
                </Col>
                <Col hidden={tipoUser?.target.value == "recibidas"}>
                  <p>{doc.data().estado}</p>
                </Col>
                <Col>
                  <p>{doc.data().disponible}</p>
                </Col>
                <Col>
                  <p className="descripcion">{doc.data().disponible}</p>
                </Col>
                {tipoUser?.target.value == "recibidas" && <div>
                <Button variant="primary" onClick={()=>cambiarEstado(doc.id,"aceptado")}>Aceptar</Button>
                <Button variant="danger" onClick={()=>cambiarEstado(doc.id,"rechazado")} >Rechazar</Button>
                </div>
                }
          
                
              </Row>
            );
          })}
      </Container>

      <style type="text/css">{`
        .row img {
          height: 96px;
          width: 96px;
        }

        .row{
          padding:1em;
          margin:auto 2%;

        }
        .col{
          margin:auto;
          text-align:center;
        }

        .row .col .descripcion{
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .row p,div{
          margin:auto 2%;
        }
      `}</style>
    </>
  );
}
