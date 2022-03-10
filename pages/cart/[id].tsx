import { useContext, useEffect, ChangeEvent, MouseEvent } from 'react'
import { Row, Col, Card, Button, ListGroup, Image, Form } from 'react-bootstrap'
import styles from '../../styles/cart.module.scss'
import useBackground from '../../hooks/useBackground'
import { useRouter } from 'next/router'
import cls from 'classnames'
import { CART_ACTION, StoreContext } from '../../context/store-context'
import Message from '../../components/message'
import { IProduct } from '../../types'
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { getData } from '../../utils/fetch'

interface Props {
  product: IProduct
  qty?: number
  _id?: string
  error: string | null
}

const Cart = ({ product, qty, _id, error }: Props) => {
  const backgroundImage = useBackground({ stripesNum: 10, topSatur: 30, lowSatur: 10 })
  const { push, back, replace } = useRouter();
  const { state, dispatch } = useContext(StoreContext)
  const { cart, cartItemsNum } = state;


  useEffect(() => {
    if (product) dispatch({ type: CART_ACTION.ADD, payload: { ...product, qty } })
  }, [qty, dispatch, product])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ cart, cartItemsNum }))
  }, [cart, cartItemsNum])


  const handleChangeQty = (product: IProduct, qty?: number, qtyChange?: number) => (e: MouseEvent | ChangeEvent) => {
    e.preventDefault();
    // onClick: (qty + qtyChange), onChange: e.target.value
    qty = (qty && qtyChange) ? qty + qtyChange : Number((e.target as HTMLInputElement).value)
    // Quantity (0 to countInStock)
    qty = (qty < 0) ? 0 : (qty > product.countInStock) ? product.countInStock : qty

    dispatch({ type: CART_ACTION.ADD, payload: { ...product, qty } })

    // Remove qty from url, to save changed qty if cart page refreshed (otherwise qty from url would overwrite localStorage)
    if (qty) replace(`/cart/_`)
  }

  const handleRemoveItem = (_id: string) => () => {
    dispatch({ type: CART_ACTION.DELETE, payload: _id })
    // Remove qty from url, to save changes if cart page refreshed (when item is removed)
    if (qty) replace(`/cart/_`)
  }

  const checkoutHandler = () => push('/login?redirect=shipping')

  if (!product && _id !== '_') {
    return <div className={cls(styles.product, 'py-5 my-5')} style={{ backgroundImage }}>
      <Message variant='danger' variable={!product && _id !== '_'} >
        {'Id does not exist'}
      </Message>
    </div>
  }

  return (
    <div className={styles.cart} style={{ backgroundImage }}>
      <Head>
        <title>Cart page</title>
        <meta name="description" content="List of products in the cart" />
      </Head>
      <Row>
        <Col lg={8} >
          <h1 className={styles.title}>SHOPPING CARD</h1>
          {cart.length ? (
            <ListGroup className={styles.listGroup} variant="flush">
              {cart.map(product => {
                const { _id, name, images, qty, price } = product;
                return (
                  <ListGroup.Item key={_id}>

                    <Row className={styles.item}>
                      <Col style={{ flex: 2 }}><Image src={images[0]} alt={name} fluid rounded /></Col>
                      <Col style={{ flex: 6 }}>
                        <span className={styles.itemName} onClick={() => push(`/product/${_id}`)}> {name} </span>
                      </Col>
                      <Col>
                        <Form className={styles.form}>

                          <input
                            className={styles.input}
                            placeholder='0'
                            value={qty || ''}
                            onChange={handleChangeQty(product)}
                            autoFocus
                          />
                          <button
                            onClick={handleChangeQty(product, qty, - 1)}
                            className={styles.btnMinus}>-</button>
                          <button
                            onClick={handleChangeQty(product, qty, 1)}
                            className={styles.btnPlus}>+</button>
                        </Form>
                      </Col>
                      <Col className={styles.price} style={{ flex: 2 }}>
                        {price + ' zł'}
                      </Col>
                      <Col>
                        <i className="fas fa-trash"
                          onClick={handleRemoveItem(_id!)}
                        ></i>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          ) : ''}

          <Message variant='info' variable={!cart.length}>
            Your cart is empty
            <Button onClick={back} className='btn-message' variant="outline-primary" >Go Back</Button>
          </Message>
          <Message variant='danger' variable={Boolean(error)}>Fail to load data</Message>
        </Col>
        <Col lg={4}>

          <Card className={cls(styles.cardWrapper, 'text-center')}>
            <Card.Header className={styles.header} />
            <Card.Body>
              <Card.Title className={styles.totalPrice}>
                <Row>
                  <Col>
                    <h3>
                      Total Price:
                    </h3>
                  </Col>
                  <Col>
                    <h3>
                      {(cart.length) && cart.reduce((acc, val) => val.qty! * val.price + acc, 0).toFixed(2)} zł
                    </h3>
                  </Col>
                </Row>
              </Card.Title>
            </Card.Body>
            <Card.Footer className={styles.footer}>
              <Button className={styles.btnCheckout} variant="success" onClick={checkoutHandler} disabled={!cart.length}>PROCEED TO CHECKOUT</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const _id = String(context.params?.id)
  const qty = Number(context.query.qty)

  const data = (_id !== '_') ? await getData('products', _id) : null

  return {
    props: {
      product: data ? { ...data, _id } : null,
      _id,
      qty: qty || 1,
      error: data?.error || null
    }
  }
}

export default Cart;