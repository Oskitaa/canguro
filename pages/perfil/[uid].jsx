import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "/firebase/client";
import { Container, Image, Row, Button } from "react-bootstrap";
import { Edad } from "/components/utils/utils";
import { days, horario, exp } from "/constant/forms";
import Oferta from "/components/oferta.jsx/oferta";

export default function Perfil() {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState({});
  const [visible, serVisible] = useState(true);

  const changeVisibility = () => serVisible(!visible);

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((e) => {
        setUser(e.data());
      });
  }, [uid]);

  return (
    <>
      <Container className="perfil-foto">
        <div className="background"></div>
        <Row>
          <Image src={user?.photoURL} rounded />
          <p>
            {user?.nombre} • {Edad(user?.fecha_nacimiento)}
          </p>
        </Row>
      </Container>

      <Container className="perfil">
        <p className="perfil-descripcion">{user?.descripcion}</p>

        <h2>
          {user?.tipo === "canguro" ? "Disponibilidad" : "Horas necesarias"}
        </h2>

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
                        {user?.horario?.find((e) => e === day + hour) && (
                          <i class="fas fa-check"></i>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>{user?.tipo === "canguro" ? "Experiencia" : "Progenitores"}</h2>
        <table className="exp">
          <thead>
            <tr>
              {exp.map((e) => {
                return <th key={e}>{e}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {exp.map((el) => {
                return (
                  <th>
                    {user?.experiencia?.find((e) => e === el) && (
                      <i class="fas fa-check"></i>
                    )}
                  </th>
                );
              })}
            </tr>
          </tbody>
        </table>
      </Container>

      <Container className="perfil-precio">
        <p className="mr-auto">{user?.precio} €/hora</p>
        <Button variant="secondary" size="lg" onClick={changeVisibility}>
          Enviar una ofertar
        </Button>
      </Container>
      <div className="perfil-modal" hidden={visible}>
        <div className="background-oferta"></div>
        <Oferta userPerfil={user} visible={changeVisibility} className="oferta"/>
      </div>

      <style type="text/css">{`
      .perfil-foto img {
          height: 96px;
          width: 96px;
        }
        .perfil-foto{
          position:relative;
          width: 100%;
          margin:0;
          max-width: 100% !important;
        }
        .perfil-foto .row{
          padding: .8em;
        }

        .perfil-foto .row p{
          margin:auto 1em;
          font-size:2em;
        }
  
      .background{
        background-color: #59bec9;
        left: 0;
        opacity: .7;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index:-1;
      }

      .perfil-descripcion{
        margin: 2%;
        text-align:justify;
      }

      .perfil-precio{
        position:sticky;
        bottom:0;
        width:100%;
        z-index:3;
        padding:1em;
        height: 10vh;
        background-color: #fff;
        border-top: 1px solid #ddd;
        display:flex;
        line-height: 1.5;
      }

      table{
        width: 100%;
        text-align: center; 
      }

      tr{
        border-top:1px solid #ddd;
        height:27px;
      }

      tr:last-child{
        border-bottom:1px solid #ddd;

      }
      .perfil-precio p{
        font-size:1em;
      }

      .fa-check{
        color:#59bec9;
      }

      h2{
        margin: 1em auto;
      }

      .exp{
        margin-bottom:2em;
      }

      .perfil-modal{
        position:absolute;
        top:0;
        bottom:0;
        width:100%;
        height:100vh;
       
      }
      .background-oferta"{
        background: white;
        opacity:0.7;
      }

      .oferta{
        position:sticky;
      }
        `}</style>
    </>
  );
}
