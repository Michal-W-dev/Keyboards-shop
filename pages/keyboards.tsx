import { Col, Row } from 'react-bootstrap'
import Product from '../components/productCard'
import products from '../data/product'
import { useRouter } from 'next/router'

const SearchKeyboards = () => {
  const { query } = useRouter()
  const querySearch = String(query.search)
  const search = querySearch ? querySearch.toLocaleLowerCase() : ''

  return (
    <div className='SearchScreen'>
      <div className='loader'>
        {/* TODO Loader */}
      </div>
      <>
        <Row className='justify-content-center my-4'>
          {products && products.filter(({ name, category }) => (
            name.toLowerCase().includes(search) || category.toLowerCase().includes(search))
          ).map(filteredProduct => (
            <Col key={filteredProduct._id} xs={6} lg={4} xxl={3} as='div'>
              <Product {...filteredProduct} />
            </Col>
          ))}
        </Row>
      </>
      {/* TODO Message */}
    </div>
  )
}

export default SearchKeyboards
