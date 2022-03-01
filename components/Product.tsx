import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import styles from './product.module.scss'
import cls from 'classnames';
import Rating from './rating'

interface Props {
  images: string[]
  name: string
  rating: number[]
  numReviews: number
  price: number
  _id: number
  countInStock: number
}

const Product = (props: Props) => {
  const { images, name, rating, numReviews, price, _id, countInStock } = props;
  const [btnIsHovered, setBtnIsHovered] = useState(false);

  return (
    <Card className={`${styles.card} mx-xs-1 mx-lg-3 my-4`} as='div' >
      <Link href={`/product/${_id}`} passHref>
        <a className={styles["images-container"]}>
          <img src={images[0]} alt={name} />
          <img src={images[1]} alt={name} />
        </a>
      </Link>

      <Card.Body className={styles['card-body']}>
        <div className={styles['text-container']}>
          <Card.Text>{price} zł</Card.Text>
          <Rating
            value={rating}
            text={`(${numReviews})`}
          />
        </div>

        <Link href={`/product/${_id}`} passHref>{name}</Link>

        <div className={styles['movable-slate']}>
          <div className={styles['movable-slate-body']}>

            <Link href={`/cart/${_id}?qty=1`} passHref>
              <Button variant='secondary'
                className={styles.button}
                onMouseEnter={() => setBtnIsHovered(true)}
                onMouseLeave={() => setBtnIsHovered(false)}
                disabled={!countInStock}
              >{countInStock ? 'GO TO CART' : 'OUT OF STOCK'}
              </Button>
            </Link>
            {!countInStock ? '' : (
              <Link href={`/cart/${_id}?qty=1`} passHref >
                <a className={cls(styles['icon-container'], btnIsHovered && styles['green-color'])}>
                  <i className="fas fa-cart-plus icon" />
                </a>
              </Link>)}
          </div>
        </div>
      </Card.Body>
    </Card >
  )
}

export default Product;
