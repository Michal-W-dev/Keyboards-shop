import { useState, ReactNode, FormEvent, ChangeEvent } from 'react'
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import useLineAnimation from '../hooks/useLineAnimation';
import useBackground from '../hooks/useBackground'
import styles from './layout.module.scss'
import cls from 'classnames';
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [underlineStyles, lineAnimationClass, handleMouseMove, handleMouseOut] = useLineAnimation();
  const backgroundImage = useBackground({ stripesNum: 5, topSatur: 20, lowSatur: 12 })

  const [showProducts, setShowProducts] = useState(false);
  const [search, setSearch] = useState('')

  const { pathname, push } = useRouter()


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('push(`/keyboards/?search=${search}`)')
  }


  return (
    <div className={styles.layout}>
      <header className={styles.header} >
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed='top' >
          <div className={cls(styles.underline, styles[lineAnimationClass])} style={{ ...underlineStyles }} />
          <Container>
            {/* TODO Search Component */}
            <Navbar.Brand as={Link} href="/">MyShop</Navbar.Brand>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={handleSearch}
                value={search}
                autoFocus
                placeholder="write what you're looking for"
                className={cls(styles.input, 'mr-sm-2')} style={{ display: 'inline-block', width: '312px' }}
              />
              <button className={styles['btn-search']} type="submit"><i className="fas fa-search"></i></button>
            </form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
              <Nav className="me-auto">
                <Nav.Link as={'div'} className={cls(styles.follow, showProducts && styles.active)}
                  onClick={() => { setShowProducts(!showProducts); setSearch('') }}
                > Products
                  <i className="fas fa-chevron-up"
                    style={{
                      marginLeft: '1rem',
                      transform: showProducts ? 'rotate(180deg)' : 'rotate(0)',
                      transition: '0.2s'
                    }}
                  />
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link as={'div'} className={cls(styles.follow, pathname == "/cart" && styles.active)}>
                  <Link href='/cart' passHref>
                    <a>
                      <i className="fas fa-cart-arrow-down" /> Cart
                    </a>
                  </Link>
                </Nav.Link>
                {/* TODO Dropdown : Sign in */}
                <Nav.Link as={'div'} className={cls(styles.follow, pathname == "/login" && styles.active)}>
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
      <footer className='Footer py-5' style={{ backgroundImage }}>
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