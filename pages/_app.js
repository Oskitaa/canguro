import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "/components/menu";
import Bottom from "/components/bottom";
import Head from "next/head";
import {logo} from "/constant/logo"
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous"></link>
        <meta property="og:description" content="Encuentra a tu canguro ideal en tan solo 3 minutos!"/>
        <meta property="og:site_name" content="CangurApp" />
        <meta property="og:image" content={logo} />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Imagen del logp" />
      </Head>
      <Menu />
      <Component {...pageProps} />
      <Bottom />
    </>
  );
}

export default MyApp;
