import { ReactNode, CSSProperties } from 'react'
import { Alert } from 'react-bootstrap'
import styles from './message.module.scss'
import cls from 'classnames'

interface Props {
  variant: string
  children: ReactNode
  variable: boolean
  style?: CSSProperties
}

const Message = ({ variant, children, variable, style }: Props) => (
  <div className={cls(styles['message-container'], variable && styles.showMsg)} style={{ ...style }} >
    <Alert className={cls(styles.message, variable && styles.showMsg)} variant={variant} transition={false}>
      {children}
    </Alert>
  </div>
)

Message.defaultProps = {
  variant: 'info',
  variable: false,
}

export default Message