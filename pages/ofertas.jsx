import {
  obtenerPersona,
  cambiarEstado,
  db,
} from "/firebase/client";
import useUser from "/hooks/useUser";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Ofertas() {
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
  const observador = ()=>{
    let tipo = tipoUser == "enviadas" ? "uid_demandante" : "uid_ofertante"
    db
      .collection("ofertas")
      .where(tipo, "==", user?.uid)
      .onSnapshot((querySnapshot) => {
        var cities = [];
        querySnapshot.forEach((doc) => {
          if(tipoUser == "recibidas" && doc.data().estado != "enviado")
            return
          cities.push({id : doc.id,...doc.data()});
        });
        if(!ofertas || JSON.stringify(ofertas) != JSON.stringify(cities))
            setOfertas(cities)
      });
    }
  useEffect(() => {
    user === null && router.replace("/")
    user && ofertas && arrayPersonas();
    user && observador()
  }, [user, ofertas,tipoUser]);

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
        {ofertas &&
          Array.from(ofertas).map((doc) => {
            var pepe2 =
              tipoUser == "enviadas"
                ? pepe.filter((e) => e.uid == doc.uid_ofertante)
                : pepe.filter((e) => e.uid == doc.uid_demandante);
      
            return (
              <Row md="auto">
                <Col>
                  <img src={pepe2[0]?.photoURL} alt="" />
                </Col>
                <Col>
                  <p>{pepe2[0]?.nombre}</p>
                </Col>
                <Col hidden={tipoUser == "recibidas"}>
                  <p>{doc.estado}</p>
                </Col>
                <Col>
                  <p>{doc.disponible}</p>
                </Col>
                <Col>
                  <p className="descripcion">{doc?.descripcion}</p>
                </Col>
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
          border-bottom: 1px solid;
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
