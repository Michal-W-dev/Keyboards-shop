import type { NextPage } from 'next'
import Head from 'next/head'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/productCard'
import ProductCarousel from '../components/ProductCarousel'
import type { IProduct } from '../types'
import { getData } from '../utils/fetch'
import Message from '../components/message'

interface Props {
  products: IProduct[]
  error: string | null
}

const Home: NextPage<Props> = ({ products, error }) => {

  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="description" content="List of products" />
      </Head>
      <>
        {products && <ProductCarousel products={products} />}
        <Row className='justify-content-center my-4'>
          {products ? products.map(product => (
            <Col key={product._id} xs={6} lg={4} xxl={3} as='div'>
              <Product {...product} />
            </Col>
          ))
            : <Message variant='danger' variable={!products}> {error} </Message>
          }
        </Row>
      </>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getData('products')

  let products;
  if (!data.error) products = Object.entries(data).map(product => (
    { _id: product[0], ...product[1] as IProduct }
  ))

  return {
    props: {
      products: products || null,
      error: data?.error || null
    }
  }
}

export default Home
