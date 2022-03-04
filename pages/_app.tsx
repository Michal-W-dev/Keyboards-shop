import '../bootstrap.min.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from '../components/layout';
import StoreProvider from '../context/store-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
