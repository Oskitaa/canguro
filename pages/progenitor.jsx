import Head from "next/head";
import Feed from "/components/feed";
import { logo } from "/constant/logo";

export default function Progenitor() {
  return (
    <>
      <Head>
        <meta property="og:description"content="¡Encuentra a tu progenitor ideal en tan solo 3 minutos!"/>
        <meta property="og:site_name" content="CangurApp" />
        <meta property="og:image" content={logo} />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Imagen del logo" />
      </Head>
      <Feed tipo={"progenitor"}/>
    </>
  );
}