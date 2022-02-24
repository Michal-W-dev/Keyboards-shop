import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import FormGroup from '../components/formGroup'
import styles from '../styles/register.module.scss'
import useBackground from '../hooks/useBackground'
import { FormEvent } from 'react'
import cls from 'classnames';
import { useRouter } from 'next/router'

const RegisterScreen = () => {
  const backgroundImage = useBackground({ stripesNum: 6, topSatur: 30, lowSatur: 10 })
  const [bgAnimation, setBgAnimation] = useState(false)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')

  const { push } = useRouter();
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setBgAnimation(true)
    timerIdRef.current = setTimeout(() => setBgAnimation(false), 2000)
    if (password === confirmPassword) {
      // TODO save registered data -> register({ name, email, password }) -> push('/')
      console.log('registration complete')
    }
  }
  useEffect(() => () => { if (timerIdRef.current) clearTimeout(timerIdRef.current) }, [])

  useEffect(() => {
    if (password !== confirmPassword) setMsg("Passwords don't match")
    else setMsg('')
  }, [msg, password, confirmPassword])


  return (
    <div className={cls(styles.register, bgAnimation && styles.bgAnim)} style={{ backgroundImage }}>
      <h1 className={styles.title}>Create Account</h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <FormGroup
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormGroup
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormGroup
          name='confirm password'
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {/* TODO Message */}
        <Button type='submit' className={styles.btnRegister} variant="success"> Create </Button>
      </Form>
      <Row className='text-end mt-4'>
        <Col>
          <span className={styles['span-new-customer']}>Go back to </span>{' '}
          <Button
            className={styles.btnLogin}
            onClick={() => push('/login')}
            variant="outline-secondary">
            Login
          </Button>
        </Col>
      </Row>
      {/* TODO Loader */}
    </div >
  )
}

export default RegisterScreen
