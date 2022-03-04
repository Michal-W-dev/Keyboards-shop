import { useContext, useEffect, ChangeEvent, MouseEvent } from 'react'
import { Row, Col, Card, Button, ListGroup, Image, Form } from 'react-bootstrap'
import styles from '../../styles/cart.module.scss'
import useBackground from '../../hooks/useBackground'
import { useRouter } from 'next/router'
import products from '../../data/product'
import cls from 'classnames'
import { CART_ACTION, StoreContext } from '../../context/store-context'
import Message from '../../components/message'
import { IProduct } from '../../types'


const Cart = () => {
  const backgroundImage = useBackground({ stripesNum: 10, topSatur: 30, lowSatur: 10 })
  const { push, query, back } = useRouter();

  const productId = Number(query.id)
  const qty = Number(query.qty)

  const product = products.find(product => product._id === productId)

  const { state, dispatch } = useContext(StoreContext)


  useEffect(() => {
    if (product) {
      dispatch({ type: CART_ACTION.ADD, payload: { ...product, qty } })
    }
  }, [qty, dispatch, product])



  if (!product && query.id !== '_') return <h1>Id does not exist</h1>;


  const checkoutHandler = () => push('/login?redirect=shipping')

  const handleChangeQty = (product: IProduct, qty?: number, qtyChange?: number) => (e: MouseEvent | ChangeEvent) => {
    e.preventDefault();
    if (qty && qtyChange) qty += qtyChange
    else qty = Number((e.target as HTMLInputElement).value)
    if (qty < 0) qty = 0;
    else if (qty > product.countInStock) qty = product.countInStock;
    const cartItem = { ...product, qty }
    dispatch({ type: CART_ACTION.ADD, payload: cartItem })
  }


  return (
    <div className={styles.cart} style={{ backgroundImage }}>
      <Row>
        <Col lg={8} >
          <h1 className={styles.title}>SHOPPING CARD</h1>
          {state.cart.length ? (
            <ListGroup className={styles.listGroup} variant="flush">
              {state.cart.map(product => {
                const { _id, name, images, qty, price } = product;
                return (
                  <ListGroup.Item key={_id}>

                    <Row className={styles.item}>
                      <Col style={{ flex: 2 }}><Image src={images[0]} alt={name} fluid rounded /></Col>
                      <Col style={{ flex: 6 }}> {name} </Col>
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
                          onClick={(e) => { dispatch({ type: CART_ACTION.DELETE, payload: _id }) }}
                        ></i>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          ) : ''}

          <Message variant='info' variable={!state.cart.length}>
            Your cart is empty
            <Button onClick={back} className='btn-message' variant="outline-primary" >Go Back</Button>
          </Message>
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
                      {(state.cart.length) && state.cart.reduce((acc, val) => val.qty! * val.price + acc, 0).toFixed(2)} zł
                    </h3>
                  </Col>
                </Row>
              </Card.Title>
            </Card.Body>
            <Card.Footer className={styles.footer}>
              <Button className={styles.btnCheckout} variant="success" onClick={checkoutHandler} disabled={!state.cart.length}>PROCEED TO CHECKOUT</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cart;
