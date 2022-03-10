import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router';
import { Row, Col, Button, Form, Image } from 'react-bootstrap'
import FormGroup from '../../../components/formGroup'
import styles from '../../../styles/admin/productEdit.module.scss'
import useBackground from '../../../hooks/useBackground';
import { getProduct, updateProduct } from '../../../utils/fetch';
import { IProduct } from '../../../types';
import Loader from '../../../components/loader';
import Message from '../../../components/message';
import Head from 'next/head';


const ProductEdit = () => {
  const backgroundImage = useBackground({ stripesNum: 8, topSatur: 30, lowSatur: 10 })

  const [product, setProduct] = useState<IProduct>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('/images/sample_image.jpg')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [switches, setSwitches] = useState('')
  const [description, setDescription] = useState('')

  const { back, query, push } = useRouter()
  const id = (query.id) ? query.id[0] : ''


  useEffect(() => getProduct({ setProduct, setIsLoading, setError }, id), [id])

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price)
      setImage(product.images[0])
      setBrand(product.brand!)
      setCountInStock(product.countInStock)
      setCategory(product.category!)
      setSwitches(product.switches!)
      setDescription(product.description!)
    }
  }, [product])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updatedProduct = { ...product, name, price, brand, countInStock, category, switches, description }
    updateProduct({ setError, updatedProduct, id }).then(() => { push('/admin/products') })
  }

  return (
    <div className={styles.productEdit} style={{ backgroundImage }}>
      <Head>
        <title>Admin - edit product</title>
        <meta name="description" content="Edit product by admin" />
      </Head>
      {(isLoading && !error) && <Loader />}

      <h1 className={styles.title}>Edit Product</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus
            />
            <FormGroup
              name='brand'
              value={brand}
              required
              onChange={e => setBrand(e.target.value)}
            />
            <FormGroup
              name='category'
              value={category}
              required
              onChange={e => setCategory(e.target.value)}
            />
            <FormGroup
              name='switches'
              value={switches}
              required
              onChange={e => setSwitches(e.target.value)}
            />
            <FormGroup
              name='price'
              value={price}
              required
              onChange={e => setPrice(Number(e.target.value))}
            />
            <FormGroup
              name='count in stock'
              value={countInStock}
              required
              onChange={e => setCountInStock(Number(e.target.value))}
            />
          </Col>
          <Col md={5}>
            <FormGroup
              name='image'
              value={image}
              required
              onChange={e => setImage(e.target.value)}
            />
            {image.length > 0 && <Image src={image} alt='image' fluid />}
          </Col>
        </Row>
        <FormGroup
          name='description'
          value={description}
          required
          onChange={e => setDescription(e.target.value)}
          as='textarea'
        />
        <div className={styles['btns-container']}>
          <Button type='submit' className={styles['btn-update']} disabled={!product}>
            <i className="fas fa-edit" /> Update Product
          </Button>
          <Button
            className={styles['btn-GoBack']}
            variant="secondary"
            onClick={back}
          > GO BACK <i className="fas fa-door-open" />
          </Button>
        </div>
      </Form>
      <Message variant='danger' variable={Boolean(error)}>{error}</Message>
    </div>
  )
}

export default ProductEdit