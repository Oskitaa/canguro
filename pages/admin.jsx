import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { getAllOffers, getAllUsers, deleteDoc } from "/firebase/client";
import useUser from "/hooks/useUser";
import { useRouter } from "next/router";
import  Link from "next/link"

export default function Admin() {
  const user = useUser();
  const [Users, setUsers] = useState();
  const [Offers, setOffers] = useState();
  const [tipoUser, setTipoUser] = useState("users");
    const router = useRouter()

  useEffect(() => {
    getAllOffers().then((e) => setOffers(e.docs));
    getAllUsers().then((e) => setUsers(e.docs))
    user && user?.email !== "admin@cangurapp.com" && router.replace("/");
  }, [user]);

  const borrarOferta = (doc) => {
    if (confirm("Desea borrar la Oferta " + doc))
      deleteDoc(doc).then((e) => setOffers(e.docs));
  };

  return (
    <>
      <Container className="admin">
        <Form.Group
          as={Col}
          onChange={(e) => {
            setTipoUser(e.target.value);
          }}
        >
          <Row>
            <Form.Check
              type="radio"
              label="Usuarios"
              name="tipoUser"
              value="users"
              id="users"
              defaultChecked
            />
            <Form.Check
              type="radio"
              label="Ofertas"
              value="ofertas"
              name="tipoUser"
              id="ofertas"
            />
          </Row>
        </Form.Group>
        <h2>
          Un total de {tipoUser === "users" ? Users?.length : Offers?.length}{" "}
          {tipoUser}
        </h2>
        <table>
          <thead>
            {tipoUser === "users" ? (
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Acción</th>
              </tr>
            ) : (
              <tr>
                <th>Id oferta</th>
                <th>Id ofertante</th>
                <th>Id demante</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            )}
          </thead>
          <tbody>
            {tipoUser === "users"
              ? Users &&
                Users.map((e) => {
                  const data = e.data();
                  return (
                    <tr>
                      <td>{data.uid}</td>
                      <td>{data.nombre}</td>
                      <td>{data.apellido}</td>
                      <td>
                        <Button variant="danger">Borrar</Button>
                      </td>
                    </tr>
                  );
                })
              : Offers &&
                Offers.map((e) => {
                  const data = e.data();
                  console.log(data);
                  return (
                    <tr>
                      <td>{e.id}</td>
                      <td><a href={`/perfil/${data.uid_ofertante}`} target="_blank">{data.uid_ofertante}</a></td>
                      <td><a href={`/perfil/${data.uid_demandante}`} target="_blank">{data.uid_demandante}</a></td>
                      <td>{data.estado}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => borrarOferta(e.id)}
                        >
                          Borrar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </Container>

      <style type="text/css">{`
                .admin{
                    text-align:center;
                }

                .admin table,th,tr,td {
                    border:1px solid;
                    padding:10px;
                }
            `}</style>
    </>
  );
}
