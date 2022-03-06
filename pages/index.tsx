import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { Col, Row } from 'react-bootstrap'
import products from '../data/product'
import Product from '../components/productCard'
import ProductCarousel from '../components/productCarousel'


const Home: NextPage = () => {
  return (
    <div className={styles.HomeScreen}>
      <Head>
        <title>Home page</title>
        <meta name="description" content="List of products" />
      </Head>
      {/* TODO - Loader */}
      <>
        <ProductCarousel products={products} />
        <Row className='justify-content-center my-4'>
          {products && products.map(product => (
            <Col key={product._id} xs={6} lg={4} xxl={3} as='div'>
              <Product {...product} />
            </Col>
          ))}
        </Row>
        {/* TODO - Message */}
      </>
    </div>
  )
}

export default Home
