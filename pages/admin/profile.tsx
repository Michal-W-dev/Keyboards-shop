import { useState, FormEvent, useRef, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import SelectPage from '../../components/admin/selectPage'
import FormGroup from '../../components/formGroup'
import PopoverUnderConstruction from '../../components/popover'
import useBackground from '../../hooks/useBackground'
import styles from '../../styles/admin/profile.module.scss'
import cls from 'classnames';
import Head from 'next/head'

const ProfileScreen = () => {
  const backgroundImage = useBackground({ stripesNum: 7, topSatur: 30, lowSatur: 10 })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)
  const [bgAnimation, setBgAnimation] = useState(false)

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    setBgAnimation(true)
    timerIdRef.current = setTimeout(() => setBgAnimation(false), 2000)
  }

  useEffect(() => () => { if (timerIdRef.current) clearTimeout(timerIdRef.current) }, [])

  return (
    <div className={styles.profileWrapper}>
      <Head>
        <title>Admin - profile</title>
        <meta name="description" content="Edit admin profile" />
      </Head>
      <div className={cls(styles.profile, bgAnimation && styles.bgAnim)} style={{ backgroundImage }}>

        <h1 className={styles.title}>PROFILE</h1>
        {/* TODO Message */}
        <Row>
          <Col xs='auto' xl={5} className={styles['profile-section']}>
            <Form>
              <FormGroup
                name='name'
                value={name}
                inline={true}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
              <FormGroup
                name='email'
                type='email'
                value={email}
                inline={true}
                onChange={e => setEmail(e.target.value)}
              />
              <FormGroup
                name='password'
                type='password'
                value={password}
                inline={true}
                onChange={e => setPassword(e.target.value)}
              />
              <FormGroup
                name='Confirm password'
                type='password'
                placeholder='Confirm password'
                inline={true}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <Form.Group controlId='isAdmin' className={styles['formGroup-inline']}>
                <Form.Label>Is Admin</Form.Label>
                <Form.Check
                  type='checkbox'
                  className={isAdmin ? 'checked' : ''}
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                />
              </Form.Group >
              <PopoverUnderConstruction>
                <Button
                  type='submit' className={styles.btnUpdate} variant="success"
                  onClick={handleUpdate}
                > Update Profile
                </Button>
              </PopoverUnderConstruction>
            </Form>
            {/* TODO Message */}
          </Col>
        </Row>
        {/* TODO Loader */}
      </div>
      <SelectPage />
    </div>
  )
}

export default ProfileScreen;