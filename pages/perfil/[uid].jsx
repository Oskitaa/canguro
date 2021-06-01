import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "/firebase/client";
import { Container, Image, Row } from "react-bootstrap";
import { Edad } from "/components/utils/utils";

export default function Perfil() {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState({});
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
      <Container>
        <div className="background"></div>
        <Row>
          <Image src={user?.photoURL} rounded />
            <p>{user?.nombre} • {Edad(user?.fecha_nacimiento)}</p>
        </Row>
      </Container>

      <style type="text/css">{`
      img {
          height: 150px;
          width: 150px;
        }
        .container{
          position:relative;
          width: 100%;
          margin:0;
          max-width: 100% !important;
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

      .row{
        
      }
        `}</style>
    </>
  );
}
