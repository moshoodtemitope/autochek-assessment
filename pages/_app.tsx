import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Footer from "../components/footer/index";
import Header from "../components/header/index";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
