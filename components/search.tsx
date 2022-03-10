import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import styles from './search.module.scss'
import { useRouter } from 'next/router'
import { getProducts } from '../utils/fetch'
import { IProduct } from '../types'

interface Props {
  search: string
  showProducts: boolean
  hideSearch: () => void
}

let prevPath: string | null;

const Search = ({ search, showProducts, hideSearch }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [filteredProducts, setfilteredProducts] = useState<typeof products>([])

  const { push, pathname } = useRouter()

  useEffect(() => {
    if (products.length) {
      const searchedProducts = products.filter(({ name, category }) => (
        [name, category].some(el => el?.toLowerCase().includes(search))
      ))
      setfilteredProducts(searchedProducts)
    }
  }, [search, products])

  useEffect(() => getProducts({ setProducts }), [])


  useEffect(() => {
    // Hide search bar when (search is active & url change)
    const activeSearch = showProducts || search
    const noSearch = !showProducts && !search
    const isDiffPath = pathname !== prevPath

    // Save current url path (if search is active)
    if (!prevPath && activeSearch) prevPath = pathname
    else if (prevPath && noSearch) prevPath = null
    else if (prevPath && isDiffPath) hideSearch()
  }, [pathname, showProducts, search, hideSearch])


  const clickCardHandler = (_id: string) => {
    push(`/product/${_id}`)
    hideSearch()
  }

  const searchKeyboardType = (type: string) => {
    push(`/keyboards/?search=${type}`)
    hideSearch()
  }

  const filterUniqueSearchedTypes = () => {
    const i: string[] = []
    return filteredProducts.filter(({ category }, idx) => {
      if (category) {
        i.push(category);
        return i.indexOf(category) === idx
      }
    }).map(({ category }) => (
      <li key={category} onClick={() => category && searchKeyboardType(category)}> {category} </li>
    ))
  }

  const displayKeyboardTypes = ['mechanical', 'hybrid', 'membrane'].map((type, idx) => (
    <div key={idx}>
      <div className={styles.keyboardType} onClick={() => searchKeyboardType(type)}>
        {type}
      </div>
      <hr />
    </div>
  ))

  return (
    <div className={styles.search}>
      <div
        className={styles['keyboardType-container']}
        style={{ transform: showProducts ? 'scale(1)' : 'scale(1,0)' }}
      >
        <hr />
        {displayKeyboardTypes}
      </div>
      <Row className={styles['miniSearch-container']} style={{ display: search.length ? 'flex' : 'none' }}>

        <Col className={styles['miniSearch-cards']}>
          {search.length && !filteredProducts.length ?
            <div className='not-found'> The product is not found.</div>
            : filteredProducts.map(({ images, name, price, _id }, idx) => (
              <div className={styles.miniCard} key={_id} style={{ animationDelay: `${idx * 0.1}s` }} onClick={() => clickCardHandler(_id!)}>
                <img src={images[0]} alt={name} width='60px' />
                <div>
                  <p>{name}</p>
                  <p>{price.toFixed(2)}</p>
                </div>
              </div>
            ))
          }
        </Col>
        <Col xs={4} className={styles.typesBrands}>
          {search.length && filteredProducts.length ?
            (<>
              <ul><h2 className={styles.title}>TYPE:</h2>
                {filterUniqueSearchedTypes()}
              </ul>
              <ul><h2 className={styles.title}>BRAND:</h2>
                {filteredProducts.map(({ brand, _id }) => (
                  <li key={_id} onClick={() => searchKeyboardType(brand!)}>{brand}</li>
                ))}
              </ul>
            </>) : ''}
        </Col>
      </Row>
    </div>
  )
}

export default Search;
