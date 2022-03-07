import React, { useState } from 'react'
import { Row, Table, Button, Image, Col } from 'react-bootstrap'
import products from '../../data/product'
import useBackground from '../../hooks/useBackground'
import FormGroup from '../../components/formGroup'
import cls from 'classnames';
import Head from 'next/head';
// import Link from 'next/link'
import styles from '../../styles/admin/products.module.scss'
import PopoverUnderConstruction from '../../components/popover'
import SelectPage from '../../components/admin/selectPage'

const UsersScreen = () => {
  const backgroundImage = useBackground({ stripesNum: 6, topSatur: 30, lowSatur: 10 })

  const [searchProduct, setSearchProduct] = useState('');

  const filteredProducts = products.filter(({ _id, name, switches }) =>
    [_id, name, switches].some(el => String(el).toLowerCase().includes(searchProduct.toLowerCase()))
  )

  const handleDelete = (id: number) => () => {
    // Ask for permission first
  }

  const handleCreateProduct = () => {
    // push('/admin/product/new')
  }

  return (
    <div className={styles.productsWrapper}>
      <Head>
        <title>Admin - products</title>
        <meta name="description" content="Manage products by admin" />
      </Head>
      <div className={styles.products} style={{ backgroundImage }}>

        <Row className={cls(styles.header, 'mx-0 mb-3')}>
          <Col xs='auto' className='py-2'>
            <h1 className={styles.title}>PRODUCTS</h1>
          </Col>
          <Col xs='12' md='auto' className='order-xl-2 py-2'>
            <PopoverUnderConstruction>
              <Button className={styles['btn-create']} onClick={handleCreateProduct}>
                <i className="fas fa-plus" /> Create Product
              </Button>
            </PopoverUnderConstruction>
          </Col>
          <Col xl={6} className='my-1'>
            <FormGroup
              name='address'
              placeholder='Search product'
              value={searchProduct}
              onChange={e => setSearchProduct(e.target.value)}
              float
              required
              autoFocus
            />
            {/* TODO Loader */}
          </Col>
        </Row>
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>SWITCHES</th>
              <th>STOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && filteredProducts.map(({ _id, name, images, switches, countInStock }) => (
              <tr key={_id} className={styles['table-tr']}>
                <td>{_id}</td>
                <td>{name}</td>
                <td>
                  <Image src={images[0]} alt={name} fluid rounded width='65px' />
                </td>
                <td>
                  {switches}
                </td>
                <td>{countInStock}</td>
                <PopoverUnderConstruction>
                  <td>
                    {/* <Link href={`/admin/product/${_id}/edit`} passHref> */}
                    <Button className={cls(styles.btns, styles['btn-edit'])} variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                    {/* </Link> */}
                    <Button className={cls(styles.btns, styles['btn-delete'])} variant='danger' onClick={handleDelete(_id)}>
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </PopoverUnderConstruction>
              </tr>
            ))}
          </tbody>
        </Table >
        {/* TODO Message */}
      </div >
      <SelectPage />
    </div>
  )
}

export default UsersScreen