import React from 'react'
import styles from './rating.module.scss'

interface Props {
  value: number[],
  text?: string,
  fontSize?: string
}

const Rating = ({ value = [], text, fontSize = '1.4rem' }: Props) => {
  const avgValue = value.length ? value.reduce((acc, val) => acc + val) / value.length : 0

  const stars = (val: number) => {
    //Colors of stars:
    const color = (val > 4.5) ? 'GreenYellow'
      : (val > 2) ? 'Gold' : 'Tomato'

    return [...Array(5)].map((el, idx) => (
      <span className={styles.star} key={idx}>
        {//Full star above 0.75
          (val > idx + 0.75) ? <i className="fas fa-star" style={{ color }} />
            //Half star between 0.25 & 0.75
            : (val - idx > 0.25) ? <i className="fas fa-star-half-alt" style={{ color }} />
              //Empty star below 0.25
              : <i className="far fa-star" style={{ color }}></i>}
      </span>
    ))
  }

  return (
    <div className={styles.main} style={{ fontSize }}>
      {stars(avgValue)} {' '} {text}
    </div>
  )
}


export default Rating
