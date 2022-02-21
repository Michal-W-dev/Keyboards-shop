import '../bootstrap.min.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
