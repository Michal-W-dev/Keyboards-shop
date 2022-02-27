import { useState, MouseEvent } from 'react'
import { Col, Row, Card, Button, ListGroup, ListGroupItem, Dropdown, Image, DropdownButton } from 'react-bootstrap'
import products from '../../data/product'
import Rating from '../../components/rating'
import useBackground from '../../hooks/useBackground'
import ProductModal from '../../components/productModal'
import styles from '../../styles/product.module.scss';
import cls from 'classnames';
import { useRouter } from 'next/router'
import Link from 'next/link'
import ImageNext from 'next/image'

const ProductPage = () => {
  const backgroundImage = useBackground({ stripesNum: 6, topSatur: 30, lowSatur: 10 })
  const [qty, setQty] = useState(1);
  const [imageIdx, setImageIdx] = useState(0);

  const { query, push } = useRouter()

  const [modalShow, setModalShow] = useState(false);
  const displayModal = () => setModalShow(true)

  let productId = Number(query.id)
  let product = products.find(product => product._id === productId)
  if (!product) return <h1>Id does not exist</h1>;

  const { images, name, rating, numReviews, price, countInStock, description, descriptionLong, switches, category } = product;

  const handleAddToCart = () => push(`/cart/${productId}?qty=${qty}`)
  const chooseDropdownQty = (e: MouseEvent) => setQty(Number((e.target as HTMLOptionElement).value))

  return (
    <div
      className={cls(styles.product, 'bg-primary pt-1')} style={{ backgroundImage }}>
      {/* TODO Loader & Message */}
      <>
        <Row className='d-flex flex-column flex-lg-row mb-2'>
          <div className={styles.imageWrapper}>
            {/* Mini Images ----------- */}
            <div className={styles.miniImagesWrapper}>
              {images.map((image, idx) => (
                <div key={idx} onClick={() => setImageIdx(idx)}>
                  <ImageNext src={image} layout='fill' objectFit='contain' />
                </div>
              ))}
            </div>
            {/* Main Image ----------- */}
            <Image className={styles.image} src={images[imageIdx]} onClick={displayModal} fluid alt={name} />
            <ProductModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              images={images}
              name={name}
              index={imageIdx}
            />
          </div>
          <Row className={styles.productWrapper}>
            <h1 className='pt-5 title'>{name}</h1>
            <hr className='mb-1' />
            <Rating
              value={rating}
              text={numReviews === 1 ? '(1 review)' : `(${numReviews} reviews)`}
            />
            <hr className='mt-1' />
            <Row className='mt-4 text-start'>
              <Col className={styles.specificationWrapper} >
                <h2>Specification:</h2>
                <hr />
                <div className='text-start pt-2'>
                  <p><span>Type:</span> {category} </p>
                  <p><span>Switches:</span> {switches} </p>
                  <p className='pt-3'>{description}</p>
                </div>
              </Col>

              {/* ADD TO CART section */}
              <div>
                <Col className={styles.cartWrapper} >
                  <Card>
                    <Card.Header className="text-light">
                      <Row>
                        <Col><h2>Price: </h2></Col>
                        <Col><h2>{price} zł</h2></Col>
                      </Row>
                    </Card.Header>
                    <hr />
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        {!countInStock &&
                          <ListGroupItem>
                            <Row>
                              <p className={styles.outOfStock}>Out Of Stock</p>
                            </Row>
                          </ListGroupItem>
                        }
                        {countInStock > 0 && (
                          <ListGroupItem>
                            <Row>
                              <Col><p>Quantity:</p></Col>
                              <Col>
                                <DropdownButton title={qty + ' '}>
                                  {[...Array(countInStock > 10 ? 10 : countInStock)].map((_, num) => (
                                    <Dropdown.Item as='option' onClick={chooseDropdownQty} key={num + 1} value={num + 1}>
                                      {num + 1}
                                    </Dropdown.Item>
                                  ))}
                                </DropdownButton>
                              </Col>
                            </Row>

                          </ListGroupItem>
                        )}
                      </ListGroup>

                    </Card.Body>
                    <hr />
                    <Card.Footer className="text-muted">
                      <Button
                        variant="success"
                        onClick={handleAddToCart}
                        disabled={!countInStock}
                      >ADD TO CART
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </div>

            </Row>
          </Row>
        </Row>
        <hr />
        <Row>
          <div className={cls(styles.description, 'text-start')}>
            <h2>Description: </h2>
            <p>{descriptionLong}</p>
          </div>
          <hr />
          {/* TODO Review */}

          <Link href='/'><a className={styles['btn-goBack']}><Button>GO BACK</Button></a></Link>
        </Row>
      </>
    </div >
  )
}

export default ProductPage;