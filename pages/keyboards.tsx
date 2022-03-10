import { Col, Row } from 'react-bootstrap';
import Product from '../components/productCard';
import Head from 'next/head';
import { getData } from '../utils/fetch';
import { IProduct } from '../types';
import { GetServerSideProps } from 'next';
import Message from '../components/message';

interface Props {
  products: IProduct[]
  error: string
}

const SearchKeyboards = ({ products, error }: Props) => (
  <div>
    <Head>
      <title>Search keyboards page</title>
      <meta name="description" content="Show filtered keyboards by brand or type." />
    </Head>
    <div className='loader'>
    </div>
    <>
      <Row className='justify-content-center my-4'>
        {products && products.map(filteredProduct => (
          <Col key={filteredProduct._id} xs={6} lg={4} xxl={3} as='div'>
            <Product {...filteredProduct} />
          </Col>
        ))}
      </Row>
    </>
    <Message variant='danger' variable={Boolean(error)}>Fail to load data</Message>
  </div>
)


export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getData('products')
  const { query } = context;
  const search = String(query.search)

  let products;
  if (!data.error) products = Object.entries(data).map(product => (
    { _id: product[0], ...product[1] as IProduct }
  )).filter(({ brand, category }) => (
    [brand, category].some(el => el?.toLowerCase().includes(search.toLowerCase()))
  ))

  return {
    props: {
      products: products || null,
      error: data?.error || null
    }
  }
}

export default SearchKeyboards
