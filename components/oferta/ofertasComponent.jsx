import {
  obtenerPersona,
  cambiarEstado,
  db,
  borrarOferta,
} from "/firebase/client";
import useUser from "/hooks/useUser";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useRouter } from "next/router";

export default function OfertasComponents() {
  const user = useUser();
  const router = useRouter();

  const [tipoUser, setTipoUser] = useState("enviadas");
  const [ofertas, setOfertas] = useState();
  const [pepe, setPepe] = useState([]);

  const arrayPersonas = () => {
    setPepe([]);
    Array.from(ofertas).forEach((e) => {
      tipoUser == "enviadas"
        ? obtenerPersona(e.uid_ofertante).then((el) => {
            setPepe((p) => p.concat(el.data()));
          })
        : obtenerPersona(e.uid_demandante).then((el) => {
            setPepe((p) => p.concat(el.data()));
          });
    });
  };
  const observador = () => {
    let tipo = tipoUser == "enviadas" ? "uid_demandante" : "uid_ofertante";
    db.collection("ofertas")
      .where(tipo, "==", user?.uid)
      .onSnapshot((querySnapshot) => {
        var cities = [];
        querySnapshot.forEach((doc) => {
          if (tipoUser == "recibidas" && doc.data().estado != "enviado") return;
          cities.push({ id: doc.id, ...doc.data() });
        });
        if (!ofertas || JSON.stringify(ofertas) != JSON.stringify(cities))
          setOfertas(cities);
      });
  };
  useEffect(() => {
    user === null && router.replace("/");
    user && ofertas && arrayPersonas();
    user && observador();
  }, [user, ofertas, tipoUser]);

  return (
    <>
      <Container>
        <Form.Group
          as={Col}
          onChange={(e) => {
            setTipoUser(e.target.value);
          }}
        >
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
        <Row md="auto">
          {ofertas &&
            Array.from(ofertas).map((doc) => {
              var pepe2 =
                tipoUser == "enviadas"
                  ? pepe.filter((e) => e.uid == doc.uid_ofertante)
                  : pepe.filter((e) => e.uid == doc.uid_demandante);

              return (
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={pepe2[0]?.photoURL} />
                    <Card.Body>
                      <Card.Title>{pepe2[0]?.nombre}</Card.Title>
                      <Card.Text>
                        <p hidden={tipoUser == "recibidas"}>
                          Estado : {doc.estado}
                        </p>
                        <p>Horario : {doc.disponible}</p>
                        <p className="descripcion">
                          Descripción : {doc?.descripcion}
                        </p>
                        {tipoUser == "enviadas" && (
                          <Button
                            variant="danger"
                            onClick={() => {
                              borrarOferta(doc.id);
                            }}
                          >
                            Borrar
                          </Button>
                        )}{" "}
                      </Card.Text>
                      {tipoUser == "recibidas" && (
                        <div>
                          <Button
                            variant="primary"
                            onClick={() => cambiarEstado(doc.id, "aceptado")}
                          >
                            Aceptar
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => cambiarEstado(doc.id, "rechazado")}
                          >
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>

      <style type="text/css">{`
          .row img {
            height: 180px;
            width: 286px;
          }
  
          .row{
            padding:1em;
            margin:auto 2%;
            border-bottom: 1px solid;
          }
          .col{
            margin:auto;
            margin-bottom:2em;
            text-align:center;
          }
  
          .row .col .descripcion{
            overflow: hidden;
            text-overflow: ellipsis;

          }
          .card{
            height:400px;
          }

          .card-body{
            overflow:scroll;
          }

          .form-check:last-child{
            margin-left:10px;
          }
        `}</style>
    </>
  );
}
