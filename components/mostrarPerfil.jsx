import { useEffect, useState } from "react";
import { obtenerPersona ,borrarUsuario} from "/firebase/client";
import { Container, Image, Row, Button, Col } from "react-bootstrap";
import { Edad } from "/components/utils/utils";
import { days, horario, exp } from "/constant/forms";
import Oferta from "/components/oferta/enviarOferta";
import Head from "next/head";
import Link from "next/link";
import mapboxgl from "!mapbox-gl";
import { useRef } from "react";
import { url, token } from "/constant/mapa";
import useUser from "/hooks/useUser";

export default function MostrarPerfil(props) {
  const uid = props.uid;
  const [user, setUser] = useState({});
  const [visible, serVisible] = useState(true);

  const changeVisibility = () => serVisible(!visible);

  mapboxgl.accessToken = token;

  const mapContainer = useRef(null);
  const map = useRef(null);
  useEffect(() => {
    user &&
      fetch(`${url}${user?.domicilio}.json?access_token=${token}`)
        .then((e) => e.json())
        .then((e) => {
      
          const { features } = e;
          const { center } = features[0] || [0,0];
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: center ? [center[0], center[1]] : [0, 0],
            zoom: 18,
          });
          new mapboxgl.Marker()
            .setLngLat(center ? [center[0], center[1]] : [0, 0])
            .addTo(map.current);
        });

    if (map.current) return;
  }, [map, user]);

  useEffect(async () => {
    obtenerPersona(uid).then((e) => setUser(e.data()));
  }, [uid]);

  return (
    <>
      {user !== null && (
        <Head>
          <meta property="og:description" content={user?.descripcion} />
          <meta property="og:site_name" content="CangurApp" />
          <meta property="og:image" content={user?.photoURL} />
          <meta property="og:image:secure_url" content={user?.photoURL} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta property="og:image:alt" content="Imagen del logo" />
        </Head>
      )}
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css"
          rel="stylesheet"
        ></link>
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"></script>
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css"
          type="text/css"
        ></link>
      </Head>

      <Container className="perfil-foto">
        <div className="background"></div>
        <Row>
          <Image src={user?.photoURL} rounded />
          <Col>
            <p>
              {user?.nombre} • {Edad(user?.fecha_nacimiento)}
            </p>
            <p className="locate">
              {user?.tipo} en {user?.provincia}
            </p>
          </Col>
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
      <Container>
        <div ref={mapContainer} className="map-container" />
      </Container>
      <Container className="perfil-precio" hidden={!useUser()}>
        <p className="mr-auto" hidden={props.mio}>
          {user?.precio} €/hora
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={changeVisibility}
          hidden={props.mio}
        >
          Enviar una oferta
        </Button>
        <Link href="/perfil/editar">
          <a className="btn btn-primary hola" hidden={!props.mio}>
            Editar
          </a>
        </Link>
        <Button variant="danger hola" hidden={!props.mio} onClick={
          ()=>{
          if(confirm("Desea borrar su cuenta?"))
            borrarUsuario ()
          }
        }>
            Borrar 
        </Button>
      </Container>
      <div className="perfil-modal" hidden={visible}>
        <div className="background-oferta"></div>
        <Oferta
          userPerfil={user}
          visible={changeVisibility}
          className="oferta"
        />
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
          margin-left:0;
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
        margin:auto;
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
        position:sticky;
        top:0;
        bottom:0;
        width:100%;
        height:100vh;
        z-index:5;
      }
      .background-oferta{
        background: white;
        opacity:0.7;
        width: 100%;
        height: 100%;
      }

      .oferta{
        position:sticky;
      }

      .modal-dialog{
        position:absolute;
        top:0;
        bottom:0;
        right:0;
        left:0;
      }

      .perfil-precio .hola{
        width: 100%;
      }

      .map-container{
        height: 400px;
      }

      .perfil-foto .row .locate{
        font-size: 0.7em;
        text-transform: uppercase; 

      }
        `}</style>
    </>
  );
}
