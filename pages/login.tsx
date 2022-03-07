import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import styles from '../styles/login.module.scss'
import useBackground from '../hooks/useBackground'
import { useRouter } from 'next/router'
import FormGroup from '../components/formGroup'
import cls from 'classnames';
import Head from 'next/head';
import PopoverUnderConstruction from '../components/popover'


const LoginScreen = () => {
  const backgroundImage = useBackground({ stripesNum: 6, topSatur: 30, lowSatur: 10 })
  const [bgAnimation, setBgAnimation] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const { push } = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPassword('')
    setBgAnimation(true)
    timerIdRef.current = setTimeout(() => setBgAnimation(false), 2000)
  }

  useEffect(() => () => { if (timerIdRef.current) clearTimeout(timerIdRef.current) }, [])


  return (
    <div className={cls(styles.login, bgAnimation && styles.bgAnim)} style={{ backgroundImage }}>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Login user" />
      </Head>
      <h1 className={styles.title}>Sign In</h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <FormGroup
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {/* TODO Message */}
        <PopoverUnderConstruction>
          <Button type='submit' className={styles.btnSignIn} variant="success"> Sign In </Button>
        </PopoverUnderConstruction>
      </Form>
      <Row className='text-center'>
        <Col>
          <span className={styles['span-new-customer']}>{"Don't have an account? - "}</span>{' '}
          <Button
            className={styles.btnRegister}
            onClick={() => push('/register')}
            variant="outline-secondary">
            Register
          </Button>
        </Col>
      </Row>
      {/* TODO Loader */}
    </div>
  )
}

export default LoginScreen;