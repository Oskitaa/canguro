import Head from "next/head";
import Link from "next/link";
import { Container, Row , Col} from "react-bootstrap";
import { logo } from "/constant/logo";

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:description"content="Encuentra a tu canguro ideal en tan solo 3 minutos!"/>
        <meta property="og:site_name" content="CangurApp" />
        <meta property="og:image" content={logo} />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Imagen del logo" />
      </Head>
      <Container className="principal">
        <h1>Niñeres con experiencia y referencias</h1>
        <Row>
          <Col>
          <Link href="/progenitor"><a className="btn btn-primary">Soy Canguro</a></Link>
          <Link href="/canguro"><a className="btn btn-primary">Soy Progenitor</a></Link>
          </Col>
        </Row>
      </Container>
        
      <style type="text/css">{`
        .principal{
          height:90vh;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          text-align:center;

        }
          .principal .row .col a{
              margin-right:10px;
          }
      `}</style>
    </>
  );
}
