import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
