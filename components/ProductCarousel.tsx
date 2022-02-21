import React from 'react'
import { Carousel } from 'react-bootstrap'
import styles from './productCarousel.module.scss'
import cls from 'classnames';


interface Props {
  products: {
    images: string[]
    name: string
    brand: string
    description: string
    rating: number[]
    numReviews: number
    price: number
    _id: number
  }[]
}


const ProductCarousel = ({ products }: Props) => {

  const renderCarousel = (productsIdx = [0, 1]) => {
    if (products.length) {
      // productsIdx - which products appear on carousel (selected by idx)
      return productsIdx.map((selectedIdx, idx) => {
        return (
          <Carousel.Item key={selectedIdx} interval={44200} >
            <img
              className={cls('d-block', styles.item, idx % 2 ? styles.itemRight : styles.itemLeft)}
              src={products[selectedIdx].images[0]}
              alt={products[selectedIdx].name}
              height='300rem'
            />

            <div
              className={cls(styles['carousel-left'], idx % 2 ? styles.slide : styles.imgBackground)}>
              <h1 className={styles.title}>{idx % 2 ? products[selectedIdx].brand : ''}</h1>
              <p className={styles.description}>{idx % 2 ? products[selectedIdx].description : ''}</p>
            </div>

            <div
              className={cls(styles['carousel-right'], idx % 2 ? styles.imgBackground : styles.slide)}>
              <h1 className={styles.title}>{idx % 2 ? '' : products[selectedIdx].brand}</h1>
              <p className={styles.description}>{idx % 2 ? '' : products[selectedIdx].description}</p>
            </div>

            <Carousel.Caption>
              <h1>{products[selectedIdx].name}</h1>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })
    }
  }

  return (
    <Carousel className={`${styles.carousel} text-primary pb-1`}>
      {renderCarousel([0, 1, 2, 3])}
    </Carousel>
  )
}

export default ProductCarousel
