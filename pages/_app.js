import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "/components/menu";
import Bottom from "/components/bottom";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous"></link>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css" rel="stylesheet"></link>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.js"></script>
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css" type="text/css"></link>
 
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
      </Head>
      <Menu />
      <Component {...pageProps} />
      <Bottom />
    </>
  );
}

export default MyApp;
