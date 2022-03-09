import { CSSProperties } from 'react'
import { Spinner } from 'react-bootstrap'

interface Props {
  size?: string
  variant?: string
  style?: CSSProperties
}

const Loader = ({ size, variant, style }: Props) => (
  <Spinner animation="border" variant={variant} style={{ width: size, height: size, margin: '0 auto', ...style }} />
)

Loader.defaultProps = {
  size: '90px',
  variant: 'info',
}

export default Loader;