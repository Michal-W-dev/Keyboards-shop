import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import styles from './miniCart.module.scss'
import cls from 'classnames'
import { CART_ACTION, DispatchCart } from '../context/store-context'
import { IProduct } from '../types'
import { useRouter } from 'next/router'


interface Props {
  cart: IProduct[]
  dispatch: DispatchCart
  showCart: boolean
}

const MiniCart = ({ cart, dispatch, showCart }: Props) => {

  const { push } = useRouter()

  const handleRemoveItem = (_id: string) => () => {
    dispatch({ type: CART_ACTION.DELETE, payload: _id })
  }

  return (
    <div className={cls(styles.miniCart, showCart && styles.showCart)}>
      <Row>
        <Col lg={8}>
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
                        <span>
                          {qty}
                        </span>
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
        </Col>
      </Row>
      <Row>
        <div className={styles.total}>Total: {' '}
          {(cart.length) && cart.reduce((acc, val) => val.qty! * val.price + acc, 0).toFixed(2)} zł
        </div>
      </Row>
      <Row className={cls(styles.btnsDiv, 'justify-content-between')}>
        <button onClick={() => push('/cart/_')}><i className="fas fa-cart-arrow-down" /> Go to Cart </button>
        <button onClick={() => push('/login?redirect=shipping')}>Checkout</button>
      </Row >
    </div >
  )
}


export default MiniCart;