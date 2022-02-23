import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import styles from '../styles/login.module.scss'
import useBackground from '../hooks/useBackground'
import { useRouter } from 'next/router'
import FormGroup from '../components/formGroup'
import cls from 'classnames';

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
      <h1 className={styles.title}>Sign In</h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup
          name='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          autoFocus
        />
        <FormGroup
          name='password'
          type='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {/* TODO Message */}
        <Button type='submit' className={styles.btnSignIn} variant="success"> Sign In </Button>
      </Form>
      <Row className='text-center'>
        <Col>
          <span className={styles['span-new-customer']}>{"If you're a "}<span>new Customer</span> - </span>{' '}
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