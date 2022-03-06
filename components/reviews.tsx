import React from 'react'
import styles from './reviews.module.scss'
import Rating from './rating'
import { Row, Col, Button } from 'react-bootstrap'
import PopoverUnderConstruction from './popover'
import cls from 'classnames'

interface Props {
  rating: number[]
  numReviews: number
}

const Reviews = ({ rating, numReviews }: Props) => {
  const avgRating = rating.length ? Math.round(rating.reduce((acc, val) => acc + val) * 10 / rating.length) / 10 : 0

  const countRate = (whichRate: number) => rating.filter(x => x === whichRate).length
  const ratePercent = (whichRate: number) => countRate(whichRate) / rating.length * 100 + '%'

  return (
    <Row className={cls(styles.reviews, 'px-md-5')}>
      <Col className='' style={{ flex: '0.9 0 120px' }}>
        <div className="d-flex justify-content-center">
          <div className="content text-center">
            <div className={styles.ratings}> <span className={styles['product-rating']}>{avgRating}</span><span>/ 5</span>
              <Rating value={rating} />
              <div className="rating-text"> <span>{numReviews} reviews</span> </div>
            </div>
          </div>
        </div>
      </Col>
      <Col style={{ flex: '1 0 300px' }}>
        <table className="text-left mx-auto my-3">
          <tbody>
            {Array(5).fill(0).map((_, idx, arr) => {
              const starNum = arr.length - idx
              return (
                <tr key={idx}>
                  <td className={styles['rating-label']}><i className="fas fa-star sm" /> {starNum} </td>
                  <td className={styles['rating-bar']}>
                    <div className={styles['bar-container']}>

                      <div className={styles.bar}
                        style={{ width: ratePercent(starNum) }}
                      />
                    </div>
                  </td>
                  <td className={cls(styles['star-number'], 'text-right')}>{countRate(starNum)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Col>
      <Col style={{ flex: '1 0 300px' }} className='px-4 mt-3'>
        <div className={styles['write-review']}>
          <p>Help others to make their choice</p>
          <PopoverUnderConstruction>
            <Button variant='info'> Write review </Button>
          </PopoverUnderConstruction>
        </div>
      </Col>
    </Row>
  )
}

Reviews.defaultProps = {
  rating: [],
  numReviews: 0
}


export default Reviews