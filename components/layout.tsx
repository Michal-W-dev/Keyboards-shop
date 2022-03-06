import { useState, ReactNode, FormEvent, ChangeEvent, useCallback, useContext, useEffect } from 'react'
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import useLineAnimation from '../hooks/useLineAnimation';
import useBackground from '../hooks/useBackground'
import styles from './layout.module.scss'
import cls from 'classnames';
import { useRouter } from 'next/router'
import Search from './search'
import { StoreContext } from '../context/store-context';
import MiniCart from './miniCart';

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [underlineStyles, lineAnimationClass, handleMouseMove, handleMouseOut] = useLineAnimation();
  const backgroundImage = useBackground({ stripesNum: 5, topSatur: 20, lowSatur: 12 })

  const [showProducts, setShowProducts] = useState(false);
  const [search, setSearch] = useState('')
  const [showMiniCart, setShowMiniCart] = useState(false)

  const { pathname, push } = useRouter()

  const { state, dispatch } = useContext(StoreContext);
  const [cartItemsNum, setCartItemsNum] = useState(0);

  useEffect(() => {
    // Avoid SSR hydrate error (server content not match client content)
    setCartItemsNum(state.cartItemsNum)
  }, [state.cartItemsNum])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    push(`/keyboards/?search=${search}`)
  }

  const hideSearch = useCallback(() => {
    setShowProducts(false)
    setSearch('')
  }, [])


  return (
    <div className={styles.layout}>
      <header className={styles.header} >
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed='top' >
          <div className={cls(styles.underline, styles[lineAnimationClass])} style={{ ...underlineStyles }} />
          <Container>
            <Search search={search} showProducts={showProducts} hideSearch={hideSearch} />
            <div className={styles.brandWrapper}>
              <Navbar.Brand as={Link} href="/"><a><span>M</span>y<span>S</span>hop</a></Navbar.Brand>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                onChange={handleSearch}
                value={search}
                autoFocus
                placeholder="write what you're looking for"
              />
              <button className={styles['btn-search']} type="submit"><i className="fas fa-search"></i></button>
            </form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
              <Nav className="me-auto">
                <Nav.Link as={'div'} className={cls(styles.follow, showProducts && styles.active)}
                  onClick={() => { setShowProducts(!showProducts); setSearch('') }}
                > Products <i className={cls("fas fa-chevron-up", showProducts && styles.rotateChevron)} />
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link
                  as={'div'}
                  className={cls(styles.follow, pathname === "/cart" && styles.active, styles.cartDiv)}
                  onMouseEnter={() => setShowMiniCart(true)}
                  onMouseLeave={() => setShowMiniCart(false)}
                >
                  <Link href='/cart' passHref>
                    <a>
                      <i className="fas fa-cart-arrow-down" /> Cart
                    </a>
                  </Link>
                  {cartItemsNum !== 0 && (
                    <>
                      <span className={styles.cartItemsNum}>{cartItemsNum}</span>
                      <MiniCart cart={state.cart} dispatch={dispatch} showCart={showMiniCart} />
                    </>
                  )}
                </Nav.Link>
                {/* TODO Dropdown : Sign in */}
                <Nav.Link as={'div'} className={cls(styles.follow, pathname === "/login" && styles.active)}>
                  <Link href='/login' passHref>
                    <a>
                      <i className="fas fa-user" /> Sign In
                    </a>
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header >
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <footer className='py-5' style={{ backgroundImage }}>
        <Container>
          <Row>
            <Col>
              <h2>Copyright &copy; MyShop</h2>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Layout